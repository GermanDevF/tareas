import { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { getAllProgramadores, getAvailableUsers } from "./actions";
import { ProgramadorContent } from "./components/programador-content";

interface SearchParams {
  isCreateModalOpen?: string;
  deleteId?: string;
}

interface ProgramadoresPageProps {
  searchParams: SearchParams;
}

export const metadata: Metadata = {
  title: "Programadores",
  description: "Administra los programadores del sistema",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default async function ProgramadoresPage({
  searchParams: { isCreateModalOpen, deleteId },
}: ProgramadoresPageProps) {
  const [programadores, availableUsers] = await Promise.all([
    getAllProgramadores(),
    getAvailableUsers(),
  ]);

  return (
    <Suspense>
      <ProgramadorContent
        programadores={programadores}
        isCreateModalOpen={isCreateModalOpen === "true"}
        deleteId={deleteId}
        availableUsers={availableUsers}
      />
    </Suspense>
  );
}
