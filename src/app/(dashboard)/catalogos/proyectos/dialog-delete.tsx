"use client";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { handleDelete } from "./actions";

export default function DialogDeleteProyecto({ id }: { id: string }) {
  return (
    <Dialog open={!!id} modal>
      <DialogContent>
        <div className="flex justify-between items-center">
          <DialogTitle>Eliminar Proyecto</DialogTitle>
          <DialogClose asChild>
            <Button asChild variant="ghost" className="rounded-full">
              <Link href="/catalogos/proyectos">
                <XIcon />
              </Link>
            </Button>
          </DialogClose>
        </div>
        <p>¿Estás seguro de que deseas eliminar este proyecto?</p>
        <div className="flex gap-2 mt-4 justify-end">
          <form action={handleDelete}>
            <Button variant="destructive" type="submit">
              Eliminar
            </Button>
          </form>
          <Button variant="outline" asChild>
            <Link href="/catalogos/proyectos">Cancelar</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
