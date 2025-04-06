"use client";

import { Ambiente } from "@/@types";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { AmbienteTable } from "./ambiente-table";
import { CreateAmbienteDialog } from "./create-ambiente-dialog";
import { DeleteAmbienteDialog } from "./delete-ambiente-dialog";
import { EditAmbienteDialog } from "./edit-ambiente-dialog";

interface AmbienteContentProps {
  ambientes: Ambiente[];
}

export function AmbienteContent({ ambientes }: AmbienteContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estados de los diálogos
  const showCreateDialog = searchParams.get("dialog") === "create";
  const showDeleteDialog = searchParams.get("dialog") === "delete";
  const showEditDialog = searchParams.get("dialog") === "edit";

  // IDs para editar/eliminar
  const selectedId = searchParams.get("id");

  const updateDialogState = (dialog: string | null, id?: string) => {
    const params = new URLSearchParams(searchParams);

    // Limpiar parámetros existentes
    params.delete("dialog");
    params.delete("id");

    // Agregar nuevos parámetros si es necesario
    if (dialog) {
      params.set("dialog", dialog);
      if (id) {
        params.set("id", id);
      }
    }

    router.replace(`/catalogos/ambientes?${params.toString()}`);
  };

  const handleCreate = () => {
    updateDialogState("create");
  };

  const handleEdit = (id: string) => {
    updateDialogState("edit", id);
  };

  const handleDelete = (id: string) => {
    updateDialogState("delete", id);
  };

  const handleCloseDialog = () => {
    updateDialogState(null);
  };

  const selectedAmbiente = selectedId
    ? ambientes.find((ambiente) => ambiente.id === selectedId)
    : undefined;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Ambientes</h1>
        <Button onClick={handleCreate} className="flex gap-2">
          <PlusIcon className="h-4 w-4" />
          Crear Ambiente
        </Button>
      </div>

      <AmbienteTable
        ambientes={ambientes}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <CreateAmbienteDialog
        isOpen={showCreateDialog}
        onOpenChange={(open) => !open && handleCloseDialog()}
      />

      <DeleteAmbienteDialog
        isOpen={showDeleteDialog}
        onOpenChange={(open) => !open && handleCloseDialog()}
        ambienteId={selectedId || undefined}
      />

      {selectedAmbiente && showEditDialog && (
        <EditAmbienteDialog
          isOpen={true}
          onOpenChange={(open) => !open && handleCloseDialog()}
          ambiente={selectedAmbiente}
        />
      )}
    </div>
  );
}
