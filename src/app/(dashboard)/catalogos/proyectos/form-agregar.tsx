"use client";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createProyecto } from "./actions";

const createProyectoSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
});

type ProyectoFormValues = z.infer<typeof createProyectoSchema>;

export const FormAgregarProyecto = () => {
  const form = useForm<ProyectoFormValues>({
    resolver: zodResolver(createProyectoSchema),
  });

  const onSubmit = async (data: ProyectoFormValues) => {
    debugger;
    const formData = new FormData();
    formData.append("name", data.name);
    const result = await createProyecto(formData);
    console.log({ result });
  };

  return (
    <div className="flex flex-col gap-4">
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
          <Button type="submit">Agregar Proyecto</Button>
        </form>
      </Form>
    </div>
  );
};
