"use client";

import { Programador } from "@/@types";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { CreateProgramadorDialog } from "./create-programador-dialog";
import { DeleteProgramadorDialog } from "./delete-programador-dialog";
import { ProgramadorTable } from "./programador-table";

interface ProgramadorContentProps {
  programadores: Programador[];
  isCreateModalOpen: boolean;
  deleteId?: string;
  availableUsers: User[];
}

export function ProgramadorContent({
  programadores,
  isCreateModalOpen,
  deleteId,
  availableUsers,
}: ProgramadorContentProps) {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.replace("/catalogos/programadores");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Programadores</h2>
          <p className="text-muted-foreground">
            Administra los programadores del sistema
          </p>
        </div>

        <Button
          onClick={() =>
            router.push("/catalogos/programadores?isCreateModalOpen=true")
          }>
          <PlusIcon className="mr-2 h-4 w-4" />
          Nuevo Programador
        </Button>
      </div>

      <ProgramadorTable programadores={programadores} />

      <CreateProgramadorDialog
        isOpen={isCreateModalOpen}
        onOpenChange={handleOpenChange}
        availableUsers={availableUsers}
      />

      {deleteId && (
        <DeleteProgramadorDialog
          isOpen={!!deleteId}
          onOpenChange={handleOpenChange}
          programadorId={deleteId}
        />
      )}
    </>
  );
}
