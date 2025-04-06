"use client";

import { Lider } from "@/@types";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CreateLiderDialog } from "./create-lider-dialog";
import { DeleteLiderDialog } from "./delete-lider-dialog";
import { LiderTable } from "./lider-table";

interface LiderContentProps {
  lideres: Lider[];
  isCreateModalOpen: boolean;
  deleteId?: string;
  availableUsers: User[];
}

function PageHeader() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Líderes</h1>
      <p className="text-muted-foreground">Gestiona los líderes del sistema</p>
    </div>
  );
}

export function LiderContent({
  lideres,
  isCreateModalOpen,
  deleteId,
  availableUsers,
}: LiderContentProps) {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.replace("/catalogos/lideres");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeader />
        <CreateLiderDialog
          isOpen={isCreateModalOpen}
          onOpenChange={handleOpenChange}
          availableUsers={availableUsers}
        />
      </div>

      <LiderTable lideres={lideres} />

      {deleteId && (
        <DeleteLiderDialog
          isOpen={!!deleteId}
          onOpenChange={handleOpenChange}
          liderId={deleteId}
        />
      )}
    </>
  );
}
