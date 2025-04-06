"use client";

import { DeleteEstadoDialogProps } from "@/@types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { deleteEstado } from "../actions";

export function DeleteEstadoDialog({
  open,
  onOpenChange,
  estadoId,
}: DeleteEstadoDialogProps) {
  const router = useRouter();
  const deleteEstadoWithId = deleteEstado.bind(null, estadoId as string);
  const [state, dispatch] = useActionState(deleteEstadoWithId, {
    message: "",
    errors: {},
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Estado</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar este estado?
          </DialogDescription>
        </DialogHeader>

        <form action={dispatch}>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="destructive">
              Eliminar
            </Button>
          </DialogFooter>

          {state.message && (
            <p className="text-destructive text-sm mt-4">{state.message}</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
