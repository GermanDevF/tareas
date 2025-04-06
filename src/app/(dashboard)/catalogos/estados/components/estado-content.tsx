"use client";

import { Estado } from "@/@types";
import { useRouter } from "next/navigation";
import { CreateEstadoDialog } from "./create-estado-dialog";
import { DeleteEstadoDialog } from "./delete-estado-dialog";
import { EditEstadoDialog } from "./edit-estado-dialog";
import { EstadoTable } from "./estado-table";

interface EstadoContentProps {
  estados: Estado[];
  isCreateModalOpen: boolean;
  deleteId?: string;
  editId?: string;
}

function PageHeader() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Estados</h1>
      <p className="text-muted-foreground">Gestiona los estados del sistema</p>
    </div>
  );
}

export function EstadoContent({
  estados,
  isCreateModalOpen,
  deleteId,
  editId,
}: EstadoContentProps) {
  const router = useRouter();
  const estadoToEdit = editId
    ? estados.find((estado) => estado.id === editId)
    : undefined;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.replace("/catalogos/estados");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeader />
        <CreateEstadoDialog
          isOpen={isCreateModalOpen}
          onOpenChange={handleOpenChange}
        />
      </div>

      <EstadoTable estados={estados} />

      {deleteId && (
        <DeleteEstadoDialog
          open={!!deleteId}
          onOpenChange={handleOpenChange}
          estadoId={deleteId}
        />
      )}
      {estadoToEdit && (
        <EditEstadoDialog
          open={!!editId}
          onOpenChange={handleOpenChange}
          estado={estadoToEdit}
        />
      )}
    </>
  );
}
