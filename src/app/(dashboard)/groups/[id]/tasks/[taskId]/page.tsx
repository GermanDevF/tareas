import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TaskDetail } from "./task-detail";

interface TaskPageProps {
  params: {
    id: string;
    taskId: string;
  };
}

async function getTask(taskId: string) {
  return await db.task.findUnique({
    where: { id: taskId },
    include: {
      type: true,
      estado: true,
      lideres: {
        include: {
          user: true,
        },
      },
      programador: {
        include: {
          user: true,
        },
      },
      ambiente: true,
      proyecto: true,
      user: true,
    },
  });
}

export default async function TaskPage({ params }: TaskPageProps) {
  const _params = await params;
  const idParts = _params.taskId.split("__");

  const id = idParts.length > 1 ? idParts[1] : null;
  if (!id) {
    notFound();
  }
  const task = await getTask(id);

  if (!task) {
    notFound();
  }

  return <TaskDetail task={task} />;
}
