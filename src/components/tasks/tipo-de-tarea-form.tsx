"use client";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"; // Asegúrate de que la ruta a tus componentes UI sea correcta
import {
  createTipoDeTarea,
  updateTipoDeTarea,
} from "@/server/tipos-de-tareas-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { TipoDeTarea } from "@prisma/client";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const tipoDeTareaSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
});

type TipoDeTareaFormValues = z.infer<typeof tipoDeTareaSchema>;

interface TipoDeTareaFormProps {
  initialData?: TipoDeTarea;
  onTipoDeTareaCreated: () => void;
}

export const DialogCreateTipoDeTarea = ({
  initialData,
  onTipoDeTareaCreated,
}: TipoDeTareaFormProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<TipoDeTareaFormValues>({
    resolver: zodResolver(tipoDeTareaSchema),
    defaultValues: initialData ? { name: initialData.name } : { name: "" },
  });

  const onSubmit = async (values: TipoDeTareaFormValues) => {
    const result = initialData
      ? await updateTipoDeTarea(initialData.id, values)
      : await createTipoDeTarea(values);
    if (result && result.success) {
      toast.success(result.success);
      form.reset();
      setOpen(false);
      onTipoDeTareaCreated();
    } else if (result && result.error) {
      toast.error(result.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{initialData ? <Pencil /> : <Plus />}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          {initialData ? "Editar Tipo de Tarea" : "Crear Tipo de Tarea"}
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del tipo de tarea" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="secondary">Cancelar</Button>
              </DialogClose>
              <Button type="submit">
                {initialData ? "Guardar Cambios" : "Crear"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
