import { Task } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useGetTasksByGroup = (groupId: string) => {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery<Task[]>({
    queryKey: ["tasks", groupId],
    queryFn: async () => {
      const response = await fetch(`/api/tasks?groupId=${groupId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.json();
    },
  });

  return { tasks, isLoading, isError };
};
