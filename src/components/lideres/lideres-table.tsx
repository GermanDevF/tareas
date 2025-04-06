"use client";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";
import { deleteLider } from "@/server/lideres-actions";
import { Lider, User } from "@prisma/client";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface LocalLider extends Lider {
  user: User;
}

interface LiderTableProps {
  lideres: LocalLider[];
  onLiderUpdated: () => void;
  onLiderDeleted: () => void;
}

export const LideresTable = ({
  lideres,
  onLiderUpdated,
  onLiderDeleted,
}: LiderTableProps) => {
  const handleDelete = async (id: string) => {
    const result = await deleteLider(id);
    if (result && result.success) {
      toast.success(result.success);
      onLiderDeleted();
    } else if (result && result.error) {
      toast.error(result.error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full shadow rounded-lg ">
        <TableHeader>
          <TableRow>
            <TableHead className="py-3 px-4 border-b text-left">
              Imagen
            </TableHead>
            <TableHead className="py-3 px-4 border-b text-left">
              Nombre
            </TableHead>
            <TableHead className="py-3 px-4 border-b text-left">
              Correo
            </TableHead>
            <TableHead className="py-3 px-4 border-b text-left">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lideres.length > 0 ? (
            lideres.map((tipo) => (
              <TableRow key={tipo.id} className="transition-colors">
                <TableCell className="py-3 px-4 border-b">
                  {tipo.user?.image ? (
                    <Image
                      src={tipo.user.image || ""}
                      alt={tipo.user.name || ""}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  )}
                </TableCell>
                <TableCell className="py-3 px-4 border-b">
                  {tipo.user.name}
                </TableCell>
                <TableCell className="py-3 px-4 border-b">
                  {tipo.user.email}
                </TableCell>
                <TableCell className="py-3 px-4 border-b ml-auto">
                  <div className="flex gap-2">
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
