"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TipoDeTarea } from "@prisma/client";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface TipoTareaTableProps {
  tiposDeTarea: TipoDeTarea[];
}

function ColorIndicator({ color }: { color: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <div
              className="size-6 rounded-full border shadow-sm"
              style={{ backgroundColor: color }}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Color del tipo de tarea</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface ActionButtonsProps {
  tipoId: string;
  onOpenChange?: (open: boolean) => void;
}

function ActionButtons({ tipoId, onOpenChange }: ActionButtonsProps) {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/catalogos/tipos-de-tarea?editId=${tipoId}`);
  };

  const handleDeleteClick = () => {
    router.push(`/catalogos/tipos-de-tarea?deleteId=${tipoId}`);
  };

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={handleEditClick}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Editar tipo de tarea</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={handleDeleteClick}>
              <TrashIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Eliminar tipo de tarea</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export function TipoTareaTable({ tiposDeTarea }: TipoTareaTableProps) {
  if (tiposDeTarea.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No hay tipos de tarea registrados
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Color</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tiposDeTarea.map((tipo) => (
            <TableRow key={tipo.id}>
              <TableCell className="font-medium">{tipo.name}</TableCell>
              <TableCell>{tipo.description || "-"}</TableCell>
              <TableCell>
                <ColorIndicator color={tipo.color} />
              </TableCell>
              <TableCell>
                <ActionButtons tipoId={tipo.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
