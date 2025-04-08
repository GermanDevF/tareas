"use client";
import { useCreateTask } from "@/hooks/tasksActions";
import { useGetTaskRelations } from "@/hooks/tasksActions/use-get-task-relations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { DatePickerField } from "../date-picker-field";
import Icon from "../get-icon";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
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
} from "../ui";

// Definición del esquema de validación con Zod
const taskFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "El título es requerido" })
    .max(100, { message: "El título no puede tener más de 100 caracteres" }),
  content: z
    .string()
    .max(500, {
      message: "La descripción no puede tener más de 500 caracteres",
    })
    .optional(),
  branch: z
    .string()
    .max(50, { message: "La rama no puede tener más de 50 caracteres" })
    .optional(),
  linkPr: z
    .string()
    .url({ message: "El link no es válido" })
    .optional()
    .or(z.literal("")),
  typeId: z.string({
    required_error: "El tipo es requerido",
  }),
  estadoId: z.string({
    required_error: "El estado es requerido",
  }),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  devDate: z.date().optional(),
  prodDate: z.date().optional(),
  liderId: z.string({
    required_error: "El líder es requerido",
  }),
  programadorId: z.string({
    required_error: "El programador es requerido",
  }),
  projectId: z.string().optional(),
  claveZoho: z.string().optional(),
  validado: z.boolean().default(false),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

interface Props {
  group: { id: string; name: string };
}

// Componente para el formulario de creación de tareas
const TaskForm = ({
  group,
  onClose,
  isPending,
}: {
  group: { id: string; name: string };
  onClose: () => void;
  isPending: boolean;
}) => {
  const { data: session } = useSession();
  const { mutate } = useCreateTask();
  const { data: relations, isLoading: isLoadingRelations } =
    useGetTaskRelations();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      content: "",
      validado: false,
      branch: "",
      linkPr: "",
      claveZoho: "",
    },
  });

  if (isLoadingRelations || !relations) {
    return <div className="p-4 text-center">Cargando datos...</div>;
  }

  const onSubmit = (data: TaskFormValues) => {
    if (!session?.user.id) {
      toast.error("No se ha podido obtener el usuario");
      return;
    }

    const ambienteDesarrollo = relations.ambientes.find(
      (a) => a.name.toLowerCase() === "desarrollo"
    );

    if (!ambienteDesarrollo) {
      toast.error("No se encontró el ambiente de desarrollo");
      return;
    }

    const formattedData = {
      ...data,
      content: data.content || null,
      branch: data.branch || null,
      linkPr: data.linkPr || null,
      typeId: data.typeId || null,
      estadoId: data.estadoId || null,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      devDate: data.devDate || null,
      prodDate: data.prodDate || null,
      projectId: data.projectId || null,
      claveZoho: data.claveZoho || null,
      groupId: group.id,
      userId: session.user.id,
      ambienteId: ambienteDesarrollo.id,
    };

    mutate(formattedData, {
      onSuccess: () => {
        form.reset();
        onClose();
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nombre de la tarea"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descripción opcional"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <FormControl>
                  <Input
                    placeholder="feature/nombre-branch"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkPr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link PR</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://github.com/..."
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="typeId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tipo</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {relations?.tipos.map((tipo) => (
                      <SelectItem key={tipo.id} value={tipo.id}>
                        {tipo.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estadoId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Estado</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {relations?.estados.map((estado) => (
                      <SelectItem key={estado.id} value={estado.id}>
                        {estado.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePickerField
            control={form.control}
            name="startDate"
            label="Fecha de inicio"
            disabled={isPending}
          />
          <DatePickerField
            control={form.control}
            name="endDate"
            label="Fecha de entrega"
            disabled={isPending}
          />
          <DatePickerField
            control={form.control}
            name="devDate"
            label="Fecha de desarrollo"
            disabled={isPending}
          />
          <DatePickerField
            control={form.control}
            name="prodDate"
            label="Fecha de producción"
            disabled={isPending}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="liderId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Líder</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full max-w-full">
                      <SelectValue placeholder="Seleccionar líder" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {relations?.lideres.map((lider) => (
                      <SelectItem key={lider.id} value={lider.id}>
                        {lider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="programadorId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Programador</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full max-w-full">
                      <SelectValue placeholder="Seleccionar programador" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {relations?.programadores.map((programador) => (
                      <SelectItem key={programador.id} value={programador.id}>
                        {programador.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Proyecto</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar proyecto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {relations?.proyectos.map((proyecto) => (
                      <SelectItem key={proyecto.id} value={proyecto.id}>
                        {proyecto.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="claveZoho"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clave Zoho</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Clave de Zoho"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isPending}>
            <Icon iconName="Save" className="size-4 mr-2" />
            Guardar Tarea
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const DialogCreateTask = ({ group }: Props) => {
  const [open, setOpen] = useState(false);
  const { isPending } = useCreateTask();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Icon iconName="Plus" className="size-4 mr-2" />
          Agregar Tarea
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow z-50" />
        <DialogContent className="fixed top-[50%] left-[50%] w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] rounded-lg border p-6 shadow-lg data-[state=open]:animate-contentShow z-50 bg-accent">
          <DialogTitle className="text-lg font-medium">
            Nueva Tarea para {group.name}
          </DialogTitle>
          <TaskForm
            group={group}
            onClose={() => setOpen(false)}
            isPending={isPending}
          />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
