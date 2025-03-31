import { Task } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateTask = () => {
  return useMutation({
    mutationFn: async (task: Omit<Task, "createdAt" | "updatedAt">) => {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Error al crear la tarea");
      }

      const newTask = await response.json();

      return newTask;
    },
    onSuccess: () => {
      toast.success("Tarea actualizada con éxito");
    },
    onError: () => {
      toast.error("Error al crear la tarea");
    },
  });
};
