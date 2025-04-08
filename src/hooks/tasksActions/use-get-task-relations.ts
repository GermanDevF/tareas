import { useQuery } from "@tanstack/react-query";

interface TaskRelations {
  tipos: { id: string; name: string }[];
  estados: { id: string; name: string }[];
  lideres: { id: string; name: string; isLeader: boolean }[];
  programadores: { id: string; name: string; isProgrammer: boolean }[];
  ambientes: { id: string; name: string }[];
  proyectos: { id: string; name: string }[];
}

export const useGetTaskRelations = () => {
  return useQuery<TaskRelations>({
    queryKey: ["task-relations"],
    queryFn: async () => {
      const response = await fetch("/api/tasks/relations");
      if (!response.ok) {
        throw new Error("Error al obtener las relaciones");
      }
      return response.json();
    },
  });
};
