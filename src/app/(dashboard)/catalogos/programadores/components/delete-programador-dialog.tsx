"use client";

import { DeleteProgramadorDialogProps, ProgramadorState } from "@/@types";
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
import { deleteProgramador } from "../actions";

export function DeleteProgramadorDialog({
  isOpen,
  onOpenChange,
  programadorId,
}: DeleteProgramadorDialogProps) {
  const router = useRouter();
  const [state, dispatch] = useActionState(deleteProgramador, {
    message: "",
    errors: {},
  } as ProgramadorState);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Programador</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar este programador?
          </DialogDescription>
        </DialogHeader>

        <form action={dispatch}>
          <input type="hidden" name="id" value={programadorId} />
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
