"use client";

import { AmbienteState } from "@/@types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createAmbiente } from "../actions";

const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
});

interface CreateAmbienteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAmbienteDialog({
  isOpen,
  onOpenChange,
}: CreateAmbienteDialogProps) {
  const initialState = { message: "", errors: {} } as AmbienteState;
  const [state, formAction] = useActionState(createAmbiente, initialState);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);

    startTransition(async () => {
      await formAction(formData);
      if (!state?.message) {
        form.reset();
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Ambiente</DialogTitle>
          <DialogDescription>
            Ingresa los datos del nuevo ambiente
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del ambiente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Crear Ambiente</Button>
            </div>

            {state?.message && (
              <p className="text-destructive text-sm">{state.message}</p>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
