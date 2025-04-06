import { getAllProyectos } from "./actions";
import { CreateProjectDialog } from "./components/create-project-dialog";
import { DeleteProjectDialog } from "./components/delete-project-dialog";
import { EditProjectDialog } from "./components/edit-project-dialog";
import { ProjectTable } from "./components/project-table";

interface ProjectPageProps {
  searchParams: {
    isCreateProjectModalOpen?: string;
    deleteId?: string;
    editId?: string;
    [key: string]: string | string[] | undefined;
  };
}

export default async function ProjectPage({ searchParams }: ProjectPageProps) {
  const isCreateModalOpen = searchParams?.isCreateProjectModalOpen === "true";
  const deleteId = searchParams?.deleteId;
  const editId = searchParams?.editId;
  const proyectos = await getAllProyectos();

  const projectToEdit = editId
    ? proyectos.find((p) => p.id === editId)
    : undefined;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Proyectos</h1>
          <p className="text-muted-foreground">
            Gestiona los proyectos de tu organización
          </p>
        </div>
        <CreateProjectDialog isOpen={isCreateModalOpen} />
      </div>

      <ProjectTable proyectos={proyectos} />

      <DeleteProjectDialog isOpen={!!deleteId} projectId={deleteId} />
      {projectToEdit && (
        <EditProjectDialog
          open={!!editId}
          onOpenChange={(open) => {
            if (!open) {
              window.history.pushState({}, "", "/catalogos/proyectos");
            }
          }}
          proyecto={projectToEdit}
        />
      )}
    </div>
  );
}
