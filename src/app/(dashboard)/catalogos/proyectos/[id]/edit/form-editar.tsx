"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Proyecto } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { handleEdit } from "../../actions";

const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
});

interface FormEditarProyectoProps {
  proyecto: Proyecto;
}

export function FormEditarProyecto({ proyecto }: FormEditarProyectoProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: proyecto.name,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await handleEdit(proyecto.id, values);
      toast.success("Proyecto actualizado correctamente");
      router.push("/catalogos/proyectos");
      router.refresh();
    } catch (error) {
      toast.error("Error al actualizar el proyecto");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del proyecto</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del proyecto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/catalogos/proyectos")}>
            Cancelar
          </Button>
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>
    </Form>
  );
}
