import {
  Button,
  DialogFooter,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";
import { useCreateGroup, useDeleteGroup, useUpdateGroup } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Group } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { FixedSizeList as List } from "react-window";
import { toast } from "sonner";
import { z } from "zod";
import Icon from "../get-icon";

const groupSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  icon: z.string().min(1, "El icono es requerido"),
  description: z.string().nullable(),
});

type GroupFormValues = z.infer<typeof groupSchema>;

const fetchIcons = async (): Promise<string[]> => {
  const response = await fetch("https://lucide.dev/api/tags");
  if (!response.ok) throw new Error("Error al obtener iconos");
  const data = await response.json();

  // Convierte de kebab-case a PascalCase
  return Object.keys(data).map((key) =>
    key
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("")
  );
};

interface GroupFormProps {
  callback: (group: Omit<Group, "ownerId" | "createdAt" | "updatedAt">) => void;
  group?: Group | null;
}

const INITIAL_STATE_GROUP = {
  name: "",
  icon: "",
  description: "",
};

export const GroupForm = ({ callback, group }: GroupFormProps) => {
  const defaultValues = group
    ? {
        name: group.name,
        icon: group.icon || "",
        description: group.description || "",
      }
    : INITIAL_STATE_GROUP;

  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupSchema),
    defaultValues,
  });

  const {
    data: icons,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["icons"],
    queryFn: fetchIcons,
  });

  const { mutate: createGroup } = useCreateGroup();
  const { mutate: updateGroup } = useUpdateGroup();
  const { mutate: deleteGroup } = useDeleteGroup();

  const memoizedIcons = useMemo(() => icons, [icons]);

  async function onSubmit(
    data: GroupFormValues & { description: string | null }
  ) {
    try {
      const groupName = data.name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      const grupo = {
        ...group,
        id: group?.id ?? "",
        name: groupName,
        icon: data.icon,
        description: data.description ?? null,
        // createdAt: group?.createdAt ?? new Date(),
        // updatedAt: new Date(),
      };
      if (!group) {
        createGroup(grupo);
      } else {
        updateGroup(grupo);
      }
      callback(grupo);
    } catch (error) {
      toast.error("Error al crear el grupo");
    }
  }

  if (isLoading) {
    return <div>Cargando iconos...</div>; // Puedes usar un Skeleton aquí
  }

  if (isError) {
    return <div>Error al cargar los iconos: {error.message}</div>;
  }

  const columns = 5; // Número de columnas en el grid
  const itemSize = 40; // Tamaño de cada elemento en el grid

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const iconName = memoizedIcons?.[index] as string;
    if (!iconName) return null;
    return (
      <div
        style={{
          ...style,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <SelectItem key={iconName} value={iconName}>
          <Icon iconName={iconName} className="size-6" />
        </SelectItem>
      </div>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del grupo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icono</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    {field.value && (
                      <Icon iconName={field.value} className="size-6" />
                    )}
                    {!field.value && (
                      <SelectValue placeholder="Selecciona un icono" />
                    )}
                  </SelectTrigger>
                </FormControl>
                <SelectContent style={{ height: 200 }}>
                  <List
                    height={200}
                    itemCount={memoizedIcons?.length || 0}
                    itemSize={itemSize}
                    width="100%"
                    style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${columns}, 1fr)`,
                      gridTemplateRows: `repeat(auto-fit, ${itemSize}px)`,
                    }}>
                    {Row}
                  </List>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descripción del grupo"
                  className="resize-none"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          {group && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                deleteGroup(group.id);
                callback(group);
              }}>
              Eliminar
              <Icon iconName="Trash" className="size-4" />
            </Button>
          )}
          <Button type="submit">
            Guardar
            <Icon iconName="Save" className="size-4" />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
