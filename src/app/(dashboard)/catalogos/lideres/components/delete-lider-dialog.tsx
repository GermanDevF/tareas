"use client";

import { DeleteLiderDialogProps, LiderState } from "@/@types";
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
import { deleteLider } from "../actions";

export function DeleteLiderDialog({
  isOpen,
  onOpenChange,
  liderId,
}: DeleteLiderDialogProps) {
  const router = useRouter();
  const [state, dispatch] = useActionState(deleteLider, {
    message: "",
    errors: {},
  } as LiderState);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Líder</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar este líder?
          </DialogDescription>
        </DialogHeader>

        <form action={dispatch}>
          <input type="hidden" name="id" value={liderId} />
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
