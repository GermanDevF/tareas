import { z } from "zod";
import {
  Input,
  DialogFooter,
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Textarea,
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Icon from "../get-icon";
import { useEffect, useState, useMemo } from "react";
import { FixedSizeList as List } from "react-window";

const groupSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  icon: z.string().min(1, "El icono es requerido"),
  description: z.string().optional(),
});

type GroupFormValues = z.infer<typeof groupSchema>;

export const GroupForm = () => {
  const [icons, setIcons] = useState<string[]>([]);
  const [loadingIcons, setLoadingIcons] = useState(true);
  const [errorLoadingIcons, setErrorLoadingIcons] = useState<Error | null>(
    null
  );

  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: "",
      icon: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchIcons = async () => {
      setLoadingIcons(true);
      setErrorLoadingIcons(null);
      try {
        const response = await fetch("https://lucide.dev/api/tags");
        if (!response.ok) {
          throw new Error("Failed to fetch icons");
        }
        const data = await response.json();

        // cambia el case de kebab a PascalCase
        setIcons(
          Object.keys(data).map((key) =>
            key
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join("")
          )
        );
      } catch (err) {
        setErrorLoadingIcons(
          err instanceof Error ? err : new Error("Unknown error")
        );
      } finally {
        setLoadingIcons(false);
      }
    };
    fetchIcons();
  }, []);

  const memoizedIcons = useMemo(() => icons, [icons]);

  async function onSubmit(data: GroupFormValues) {
    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error al crear el grupo");
      }
      const group = response.json();
      console.log("group", group);
    } catch (error) {
      console.error("Error al crear el grupo:", error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
  }

  if (loadingIcons) {
    return <div>Cargando iconos...</div>; // Puedes usar un Skeleton aquí
  }

  if (errorLoadingIcons) {
    return <div>Error al cargar los iconos: {errorLoadingIcons.message}</div>;
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
    const iconName = memoizedIcons[index];
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
                    <Icon iconName={field.value} className="size-6" />
                    <SelectValue placeholder="Selecciona un icono" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent style={{ height: 200 }}>
                  <List
                    height={200}
                    itemCount={memoizedIcons.length}
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit">Crear</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
