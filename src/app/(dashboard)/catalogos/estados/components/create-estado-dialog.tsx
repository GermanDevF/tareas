"use client";

import { CreateEstadoDialogProps, EstadoState } from "@/@types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { createEstado } from "../actions";

export function CreateEstadoDialog({
  isOpen,
  onOpenChange,
}: CreateEstadoDialogProps) {
  const router = useRouter();
  const initialState = { message: "", errors: {} } as EstadoState;
  const [state, dispatch] = useActionState(createEstado, initialState);

  const handleCreate = () => {
    router.replace("/catalogos/estados?isCreateEstadoModalOpen=true");
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.replace("/catalogos/estados");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={handleCreate}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Nuevo Estado
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Estado</DialogTitle>
          <DialogDescription>
            Agrega un nuevo estado al sistema
          </DialogDescription>
        </DialogHeader>

        <form action={dispatch}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" />
              {state.errors?.name && (
                <span className="text-destructive text-sm">
                  {state.errors.name.join(", ")}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Crear Estado</Button>
          </div>

          {state.message && (
            <p className="text-destructive text-sm">{state.message}</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
