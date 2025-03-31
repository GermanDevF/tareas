"use client";
import {
  Button,
  DialogCreateTipoDeTarea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";
import { deleteTipoDeTarea } from "@/server/tipos-de-tareas-actions";
import { TipoDeTarea } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface TipoDeTareaTableProps {
  tiposDeTarea: TipoDeTarea[];
  onTipoDeTareaUpdated: () => void;
  onTipoDeTareaDeleted: () => void;
}

export const TipoDeTareaTable = ({
  tiposDeTarea,
  onTipoDeTareaUpdated,
  onTipoDeTareaDeleted,
}: TipoDeTareaTableProps) => {
  const handleDelete = async (id: string) => {
    const result = await deleteTipoDeTarea(id);
    if (result && result.success) {
      toast.success(result.success);
      onTipoDeTareaDeleted();
    } else if (result && result.error) {
      toast.error(result.error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Lista de Tipos de Tarea</h2>
      </div>
      <Table className="min-w-full shadow rounded-lg ">
        <TableHeader>
          <TableRow>
            <TableHead className="py-3 px-4 border-b text-left">
              Nombre
            </TableHead>
            <TableHead className="py-3 px-4 border-b text-left">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tiposDeTarea.length > 0 ? (
            tiposDeTarea.map((tipo) => (
              <TableRow key={tipo.id} className="transition-colors">
                <TableCell className="py-3 px-4 border-b">
                  {tipo.name}
                </TableCell>
                <TableCell className="py-3 px-4 border-b ml-auto">
                  <div className="flex gap-2">
                    <DialogCreateTipoDeTarea
                      initialData={tipo}
                      onTipoDeTareaCreated={onTipoDeTareaUpdated}
                    />
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(tipo.id)}
                      className="flex items-center gap-2">
                      <Trash2 className="size-4" />
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={2}
                className="py-4 px-4 text-center text-gray-500">
                No hay tipos de tarea disponibles.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
