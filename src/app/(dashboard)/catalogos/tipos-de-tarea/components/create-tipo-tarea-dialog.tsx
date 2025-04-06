"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { createTipoDeTarea, type ActionState } from "../actions";

interface CreateTipoTareaDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTipoTareaDialog({
  isOpen,
  onOpenChange,
}: CreateTipoTareaDialogProps) {
  const router = useRouter();
  const initialState: ActionState = { message: "" };
  const [state, dispatch] = useActionState(createTipoDeTarea, initialState);

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      router.push("/catalogos/tipos-de-tarea");
    }
  };

  const handleCreate = () => {
    router.push("/catalogos/tipos-de-tarea?isCreateTipoTareaModalOpen=true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} modal>
      <DialogTrigger asChild>
        <Button onClick={handleCreate}>Crear Tipo de Tarea</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Crear Tipo de Tarea</DialogTitle>
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="rounded-full p-2 h-auto"
                onClick={() => handleOpenChange(false)}>
                <XIcon className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription>
            Crea un nuevo tipo de tarea para el sistema
          </DialogDescription>
        </DialogHeader>

        <form action={dispatch}>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                placeholder="Nombre del tipo de tarea"
              />
              {state.errors?.name && (
                <p className="text-sm text-destructive">
                  {state.errors.name[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Descripción del tipo de tarea"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                name="color"
                type="color"
                className="h-10 px-3 py-2"
              />
              {state.errors?.color && (
                <p className="text-sm text-destructive">
                  {state.errors.color[0]}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear tipo de tarea</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
