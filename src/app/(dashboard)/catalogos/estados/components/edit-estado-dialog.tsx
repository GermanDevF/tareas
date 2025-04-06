"use client";

import { EditEstadoDialogProps, EstadoState } from "@/@types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { updateEstado } from "../actions";

export function EditEstadoDialog({
  open,
  onOpenChange,
  estado,
}: EditEstadoDialogProps) {
  const initialState = { message: "", errors: {} } as EstadoState;
  const updateEstadoWithId = updateEstado.bind(null, estado.id);
  const [state, dispatch] = useActionState(updateEstadoWithId, initialState);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Estado</DialogTitle>
          <DialogDescription>
            Modifica los datos del estado seleccionado
          </DialogDescription>
        </DialogHeader>

        <form action={dispatch}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" defaultValue={estado.name} />
              {state.errors?.name && (
                <span className="text-destructive text-sm">
                  {state.errors.name.join(", ")}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Actualizar Estado</Button>
          </div>

          {state.message && (
            <p className="text-destructive text-sm">{state.message}</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
