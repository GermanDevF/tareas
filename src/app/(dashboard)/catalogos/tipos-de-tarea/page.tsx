import { Suspense } from "react";
import { getAllTiposDeTarea } from "./actions";
import { TipoTareaDialogs } from "./components/tipo-tarea-dialogs";
import { TipoTareaTable } from "./components/tipo-tarea-table";

interface SearchParams {
  isCreateTipoTareaModalOpen?: string;
  deleteId?: string;
  editId?: string;
  [key: string]: string | string[] | undefined;
}

interface PageProps {
  searchParams: SearchParams;
}

function PageHeader() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Tipos de Tarea</h1>
      <p className="text-muted-foreground">
        Gestiona los tipos de tarea del sistema
      </p>
    </div>
  );
}

async function TipoTareaContent({ searchParams }: PageProps) {
  const tiposDeTarea = await getAllTiposDeTarea();
  const isCreateModalOpen = searchParams?.isCreateTipoTareaModalOpen === "true";
  const deleteId = searchParams?.deleteId;
  const editId = searchParams?.editId;

  const tipoToEdit = editId
    ? tiposDeTarea.find((tipo) => tipo.id === editId)
    : undefined;

  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeader />
        <TipoTareaDialogs
          isCreateModalOpen={isCreateModalOpen}
          deleteId={deleteId}
          editId={editId}
          tipoToEdit={tipoToEdit}
        />
      </div>

      <TipoTareaTable tiposDeTarea={tiposDeTarea} />
    </>
  );
}

export default async function TipoTareaPage({ searchParams }: PageProps) {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <Suspense
        fallback={
          <div className="flex items-center justify-between">
            <PageHeader />
          </div>
        }>
        <TipoTareaContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
