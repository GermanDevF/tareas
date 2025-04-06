"use client";

import { EditProyectoDialogProps, ProyectoState } from "@/@types";
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
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { updateProyecto } from "../actions";

export function EditProjectDialog({
  open,
  onOpenChange,
  proyecto,
}: EditProyectoDialogProps) {
  const initialState = { message: "", errors: {} } as ProyectoState;
  const updateProyectoWithId = updateProyecto.bind(null, proyecto.id);
  const [state, dispatch] = useFormState(updateProyectoWithId, initialState);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Editar Proyecto</DialogTitle>
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="rounded-full p-2 h-auto"
                asChild>
                <Link href="/catalogos/proyectos">
                  <XIcon className="h-4 w-4" />
                </Link>
              </Button>
            </DialogClose>
          </div>
          <DialogDescription>
            Modifica los detalles del proyecto
          </DialogDescription>
        </DialogHeader>

        <form action={dispatch}>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del proyecto</Label>
              <Input
                id="name"
                name="name"
                placeholder="Nombre del proyecto"
                defaultValue={proyecto.name}
              />
              {state.errors?.name && (
                <p className="text-sm text-red-500">{state.errors.name[0]}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" asChild>
              <Link href="/catalogos/proyectos">Cancelar</Link>
            </Button>
            <Button type="submit">Guardar cambios</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
