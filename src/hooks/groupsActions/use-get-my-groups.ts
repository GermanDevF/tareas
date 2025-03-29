import { Group } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useGetMyGroups = () => {
  const {
    data: groups,
    isLoading,
    isError,
  } = useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: async () => {
      const response = await fetch("/api/groups/user");
      if (!response.ok) {
        throw new Error("Error al obtener los grupos");
      }
      return response.json();
    },
  });

  return { groups, isLoading, isError };
};
