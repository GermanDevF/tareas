import { Task } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTasks = (userId: string) => {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery<Task[]>({
    queryKey: ["tasks", userId],
    queryFn: async () => {
      const response = await fetch(`/api/tasks?userId=${userId}`, {
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
