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
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createProyecto, type State } from "../actions";

interface CreateProjectDialogProps {
  isOpen: boolean;
}

export function CreateProjectDialog({ isOpen }: CreateProjectDialogProps) {
  const initialState = { message: "", errors: {} } as State;
  const [state, dispatch] = useFormState(createProyecto, initialState);

  return (
    <Dialog open={isOpen} modal>
      <DialogTrigger asChild>
        <Button asChild>
          <Link
            href={{
              pathname: "/catalogos/proyectos",
              query: { isCreateProjectModalOpen: "true" },
            }}>
            Crear Proyecto
          </Link>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Crear Proyecto</DialogTitle>
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
            Crea un nuevo proyecto para tus tareas
          </DialogDescription>
        </DialogHeader>

        <form action={dispatch}>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del proyecto</Label>
              <Input id="name" name="name" placeholder="Nombre del proyecto" />
              {state.errors?.name && (
                <p className="text-sm text-red-500">{state.errors.name[0]}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" asChild>
              <Link href="/catalogos/proyectos">Cancelar</Link>
            </Button>
            <Button type="submit">Crear proyecto</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
