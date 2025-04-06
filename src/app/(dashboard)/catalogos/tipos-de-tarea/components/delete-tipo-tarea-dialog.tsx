"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { useActionState } from "react";
import { deleteTipoDeTarea, type ActionState } from "../actions";

interface DeleteTipoTareaDialogProps {
  isOpen: boolean;
  tipoId?: string;
  onOpenChange: (open: boolean) => void;
}

export function DeleteTipoTareaDialog({
  isOpen,
  tipoId,
  onOpenChange,
}: DeleteTipoTareaDialogProps) {
  if (!tipoId) return null;

  const initialState: ActionState = { message: "" };
  const [state, dispatch] = useActionState(deleteTipoDeTarea, initialState);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} modal>
      <DialogContent>
        <div className="flex justify-between items-center">
          <DialogTitle>Eliminar Tipo de Tarea</DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="rounded-full p-2 h-auto"
              onClick={() => onOpenChange(false)}>
              <XIcon className="h-4 w-4" />
            </Button>
          </DialogClose>
        </div>
        <p className="text-muted-foreground">
          ¿Estás seguro de que deseas eliminar este tipo de tarea? Esta acción
          no se puede deshacer.
        </p>
        {state.message && (
          <p className="text-sm text-destructive">{state.message}</p>
        )}
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <form action={dispatch}>
            <input type="hidden" name="id" value={tipoId} />
            <Button variant="destructive" type="submit">
              Eliminar
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
