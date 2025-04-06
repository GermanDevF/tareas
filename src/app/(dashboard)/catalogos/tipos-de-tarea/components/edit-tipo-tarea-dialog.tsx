"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TipoDeTarea } from "@prisma/client";
import { XIcon } from "lucide-react";
import { useActionState } from "react";
import { updateTipoDeTarea, type ActionState } from "../actions";

interface EditTipoTareaDialogProps {
  open: boolean;
  tipo: TipoDeTarea;
  onOpenChange: (open: boolean) => void;
}

export function EditTipoTareaDialog({
  open,
  tipo,
  onOpenChange,
}: EditTipoTareaDialogProps) {
  const initialState: ActionState = { message: "" };
  const updateTipoWithId = updateTipoDeTarea.bind(null, tipo.id);
  const [state, dispatch] = useActionState(updateTipoWithId, initialState);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent>
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Editar Tipo de Tarea</DialogTitle>
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="rounded-full p-2 h-auto"
                onClick={() => onOpenChange(false)}>
                <XIcon className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription>
            Modifica los datos del tipo de tarea
          </DialogDescription>
        </DialogHeader>

        <form action={dispatch}>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                defaultValue={tipo.name}
                placeholder="Nombre del tipo de tarea"
                aria-describedby="name-error"
              />
              {state.errors?.name && (
                <p id="name-error" className="text-sm text-destructive">
                  {state.errors.name[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={tipo.description || ""}
                placeholder="Descripción del tipo de tarea"
                aria-describedby="description-error"
              />
              {state.errors?.description && (
                <p id="description-error" className="text-sm text-destructive">
                  {state.errors.description[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="color"
                  name="color"
                  type="color"
                  defaultValue={tipo.color}
                  className="h-10 px-3 py-2 w-20"
                  aria-describedby="color-error"
                />
                <span className="text-sm font-mono">{tipo.color}</span>
              </div>
              {state.errors?.color && (
                <p id="color-error" className="text-sm text-destructive">
                  {state.errors.color[0]}
                </p>
              )}
            </div>
          </div>

          {state.message && (
            <p className="text-sm text-destructive mb-4">{state.message}</p>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar cambios</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
