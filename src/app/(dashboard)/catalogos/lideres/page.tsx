import { Metadata, Viewport } from "next";
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

export const metadata: Metadata = {
  title: "Líderes",
  description: "Gestiona los líderes del sistema",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default async function LiderPage({
  searchParams: { isCreateLiderModalOpen, deleteId },
}: PageProps) {
  const [lideres, availableUsers] = await Promise.all([
    getAllLideres(),
    getAvailableUsers(),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<div>Cargando...</div>}>
        <LiderContent
          lideres={lideres}
          availableUsers={availableUsers}
          isCreateModalOpen={isCreateLiderModalOpen === "true"}
          deleteId={deleteId}
        />
      </Suspense>
    </div>
  );
}
