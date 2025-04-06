"use client";

import { Ambiente, AmbienteState } from "@/@types";
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
import { updateAmbiente } from "../actions";

const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
});

interface EditAmbienteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ambiente: Ambiente;
}

export function EditAmbienteDialog({
  isOpen,
  onOpenChange,
  ambiente,
}: EditAmbienteDialogProps) {
  const initialState = { message: "", errors: {} } as AmbienteState;
  const updateAmbienteWithId = updateAmbiente.bind(null, ambiente.id);
  const [state, formAction] = useActionState(
    updateAmbienteWithId,
    initialState
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ambiente.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);

    startTransition(async () => {
      await formAction(formData);
      if (!state?.message) {
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Ambiente</DialogTitle>
          <DialogDescription>
            Modifica los datos del ambiente seleccionado
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
              <Button type="submit">Actualizar Ambiente</Button>
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
