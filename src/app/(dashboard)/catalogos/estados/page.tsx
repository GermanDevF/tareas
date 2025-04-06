import { Suspense } from "react";
import { getAllEstados } from "./actions";
import { EstadoContent } from "./components/estado-content";

interface SearchParams {
  isCreateEstadoModalOpen?: string;
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
      <h1 className="text-3xl font-bold">Estados</h1>
      <p className="text-muted-foreground">Gestiona los estados del sistema</p>
    </div>
  );
}

async function EstadoPageContent({ searchParams }: PageProps) {
  const estados = await getAllEstados();
  const isCreateModalOpen = searchParams?.isCreateEstadoModalOpen === "true";
  const deleteId = searchParams?.deleteId;
  const editId = searchParams?.editId;

  return (
    <EstadoContent
      estados={estados}
      isCreateModalOpen={isCreateModalOpen}
      deleteId={deleteId}
      editId={editId}
    />
  );
}

export default async function EstadoPage({ searchParams }: PageProps) {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <Suspense
        fallback={
          <div className="flex items-center justify-between">
            <PageHeader />
          </div>
        }>
        <EstadoPageContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
