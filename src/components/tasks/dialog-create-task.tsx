"use client";
import { useCreateTask } from "@/hooks/tasksActions";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
  Textarea,
} from "../ui";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

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
  linkPr: z.string().url({ message: "El link no es válido" }).optional(),
  typeId: z.string({
    required_error: "El tipo es requerido",
  }),
  estadoId: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  devDate: z.date().optional(),
  prodDate: z.date().optional(),
  liderId: z.string().optional(),
  programadorId: z.string().optional(),
  ambienteId: z.string().optional(),
  projectId: z.string().optional(),
  claveZoho: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

interface Props {
  group: { id: string; name: string };
}

// Componente reutilizable para campos de fecha
const DatePickerField = ({
  control,
  name,
  label,
  disabled,
}: {
  control: any;
  name: keyof TaskFormValues;
  label: string;
  disabled: boolean;
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <FormLabel>{label}</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}>
                {field.value ? (
                  format(field.value, "yyyy-MM-dd")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date: Date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )}
  />
);

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
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: { title: "", content: "" },
  });

  const onSubmit = (data: TaskFormValues) => {
    if (!session?.user.id) {
      toast.error("No se ha podido obtener el usuario");
      return;
    }

    // mutate(
    //   { title: data.title, content: data.content || "", groupId: group.id },
    //   {
    //     onSuccess: () => {
    //       form.reset();
    //       onClose();
    //     },
    //     onError: () => {
    //       toast.error("Error al crear la tarea");
    //     },
    //   }
    // );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-2">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nombre de la rama"
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
                    placeholder="Link del PR"
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
            name="typeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tipo de tarea"
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
            name="estadoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Estado de la tarea"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DatePickerField
            control={form.control}
            name="startDate"
            label="Inicio"
            disabled={isPending}
          />
          <DatePickerField
            control={form.control}
            name="endDate"
            label="Entrega"
            disabled={isPending}
          />
          <DatePickerField
            control={form.control}
            name="devDate"
            label="Desarrollo"
            disabled={isPending}
          />
          <DatePickerField
            control={form.control}
            name="prodDate"
            label="Producción"
            disabled={isPending}
          />
          <FormField
            control={form.control}
            name="liderId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lider</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ID del lider"
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
            name="programadorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Programador</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ID del programador"
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
            name="projectId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proyecto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ID del proyecto"
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
        <Button className="w-full xl:w-[48%]">
          <Icon iconName="Plus" className="size-4 mr-2" />
          Agregar Tarea
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow z-50" />
        <DialogContent className="fixed top-[50%] left-[50%] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-lg border p-6 shadow-lg data-[state=open]:animate-contentShow z-50 bg-accent">
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
