import { Suspense } from "react";
import { getAllLideres, getAvailableUsers } from "./actions";
import { LiderContent } from "./components/lider-content";

interface SearchParams {
  isCreateLiderModalOpen?: string;
  deleteId?: string;
}

interface PageProps {
  searchParams: SearchParams;
}

async function LiderPageContent({ searchParams }: PageProps) {
  const [lideres, availableUsers] = await Promise.all([
    getAllLideres(),
    getAvailableUsers(),
  ]);

  const isCreateModalOpen = searchParams?.isCreateLiderModalOpen === "true";
  const deleteId = searchParams?.deleteId;

  return (
    <LiderContent
      lideres={lideres}
      availableUsers={availableUsers}
      isCreateModalOpen={isCreateModalOpen}
      deleteId={deleteId}
    />
  );
}

export default async function LiderPage({ searchParams }: PageProps) {
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<div>Cargando...</div>}>
        <LiderPageContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
