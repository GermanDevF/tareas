"use client";

import { AmbienteState } from "@/@types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useActionState } from "react";
import { deleteAmbiente } from "../actions";

interface DeleteAmbienteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ambienteId?: string;
}

export function DeleteAmbienteDialog({
  isOpen,
  onOpenChange,
  ambienteId,
}: DeleteAmbienteDialogProps) {
  const initialState = { message: "", errors: {} } as AmbienteState;
  const deleteAmbienteWithId = deleteAmbiente.bind(null, ambienteId || "");
  const [state, dispatch] = useActionState(deleteAmbienteWithId, initialState);

  if (!ambienteId) return null;

  const handleSubmit = async () => {
    const result = await dispatch();
    if (!result?.message) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Ambiente</DialogTitle>
          <DialogDescription>
            ¿Estás seguro que deseas eliminar este ambiente? Esta acción no se
            puede deshacer.
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit}>
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

          {state?.message && (
            <p className="text-destructive text-sm mt-4">{state.message}</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
