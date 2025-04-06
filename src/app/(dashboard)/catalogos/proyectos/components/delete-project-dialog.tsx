"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { deleteProyecto } from "../actions";

interface DeleteProjectDialogProps {
  isOpen: boolean;
  projectId?: string;
}

export function DeleteProjectDialog({
  isOpen,
  projectId,
}: DeleteProjectDialogProps) {
  if (!projectId) return null;

  return (
    <Dialog open={isOpen} modal>
      <DialogContent>
        <div className="flex justify-between items-center">
          <DialogTitle>Eliminar Proyecto</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" className="rounded-full p-2 h-auto" asChild>
              <Link href="/catalogos/proyectos">
                <XIcon className="h-4 w-4" />
              </Link>
            </Button>
          </DialogClose>
        </div>
        <p className="text-muted-foreground">
          ¿Estás seguro de que deseas eliminar este proyecto? Esta acción no se
          puede deshacer.
        </p>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" asChild>
            <Link href="/catalogos/proyectos">Cancelar</Link>
          </Button>
          <form action={deleteProyecto}>
            <input type="hidden" name="id" value={projectId} />
            <Button variant="destructive" type="submit">
              Eliminar
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
