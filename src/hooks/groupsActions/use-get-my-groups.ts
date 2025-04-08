import { Group, Task } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

interface LocalGroup extends Group {
  tasks: Task[];
  _count: {
    users: number;
    tasks: number;
  };
}

export const useGetMyGroups = () => {
  const {
    data: groups,
    isLoading,
    isError,
    error,
  } = useQuery<LocalGroup[]>({
    queryKey: ["groups"],
    queryFn: async () => {
      const response = await fetch("/api/groups/user");
      if (!response.ok) {
        throw new Error("Error al obtener los grupos");
      }
      return response.json();
    },
  });

  return { groups, isLoading, isError, error };
};
