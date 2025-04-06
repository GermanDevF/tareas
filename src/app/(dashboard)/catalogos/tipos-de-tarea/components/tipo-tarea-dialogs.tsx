"use client";

import { TipoDeTarea } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CreateTipoTareaDialog } from "./create-tipo-tarea-dialog";
import { DeleteTipoTareaDialog } from "./delete-tipo-tarea-dialog";
import { EditTipoTareaDialog } from "./edit-tipo-tarea-dialog";

interface TipoTareaDialogsProps {
  isCreateModalOpen: boolean;
  deleteId?: string;
  editId?: string;
  tipoToEdit?: TipoDeTarea;
}

export function TipoTareaDialogs({
  isCreateModalOpen,
  deleteId,
  editId,
  tipoToEdit,
}: TipoTareaDialogsProps) {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.replace("/catalogos/tipos-de-tarea");
    }
  };

  return (
    <>
      <CreateTipoTareaDialog
        isOpen={isCreateModalOpen}
        onOpenChange={handleOpenChange}
      />

      {deleteId && (
        <DeleteTipoTareaDialog
          isOpen={true}
          tipoId={deleteId}
          onOpenChange={handleOpenChange}
        />
      )}

      {tipoToEdit && (
        <EditTipoTareaDialog
          open={true}
          tipo={tipoToEdit}
          onOpenChange={handleOpenChange}
        />
      )}
    </>
  );
}
