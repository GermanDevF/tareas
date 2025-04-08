"use client";

import { TableCell, TableRow } from "@/components/ui";
import { Task as PrismaTask } from "@prisma/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GroupHeader } from "./group-header";
import { GroupMembers } from "./group-members";
import { GroupStats } from "./group-stats";
import { GroupTasks } from "./group-tasks";

type Task = PrismaTask & {
  group: {
    name: string;
  };
  ambiente?: {
    name: string;
  };
  estado?: {
    name: string;
  };
  proyecto?: {
    name: string;
  };
  lideres?: {
    user?: {
      name: string;
    };
  };
  programador?: {
    user?: {
      name: string;
    };
  };
  type?: {
    name: string;
    color: string;
  };
};

export type Group = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  owner: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
  users: {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
    };
  }[];
  tasks: {
    id: string;
    title: string;
    type: {
      name: string;
    } | null;
    estado: {
      name: string;
    } | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

// Extract TaskRow component
const TaskRow = ({ task }: { task: Task }) => {
  const router = useRouter();

  return (
    <TableRow
      key={task.id}
      className={`cursor-pointer ${
        task.validado
          ? "bg-emerald-800 hover:bg-emerald-700 transition-colors text-white"
          : "bg-red-900 hover:bg-red-800 transition-colors text-white"
      }`}
      onClick={() => router.push(`tasks/${task.title}__${task.id}`)}>
      <TableCell className="font-medium">{task.title}</TableCell>
      <TableCell className="font-medium">
        {task.ambiente?.name || "-"}
      </TableCell>
      <TableCell className="font-medium">{task.estado?.name || "-"}</TableCell>
      <TableCell>{task.proyecto?.name || "-"}</TableCell>
      <TableCell>{task.lideres?.user?.name || "-"}</TableCell>
      <TableCell>{task.programador?.user?.name || "-"}</TableCell>
      <TableCell>{task.claveZoho || "-"}</TableCell>
      <TableCell>{task.branch || "-"}</TableCell>
      <TableCell>
        {task.type ? (
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: task.type.color }}
            />
            <span>{task.type.name}</span>
          </div>
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell>
        {task?.linkPr ? (
          <Link href={task.linkPr} target="_blank" rel="noopener noreferrer">
            <Github className="size-5 hover:text-blue-500 " />
          </Link>
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {format(new Date(task.createdAt), "dd/MM/yyyy", { locale: es })}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {task.startDate
          ? format(new Date(task.startDate), "dd/MM/yyyy", { locale: es })
          : "-"}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {task.endDate
          ? format(new Date(task.endDate), "dd/MM/yyyy", { locale: es })
          : "-"}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {task.prodDate
          ? format(new Date(task.prodDate), "dd/MM/yyyy", { locale: es })
          : "-"}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {task.devDate
          ? format(new Date(task.devDate), "dd/MM/yyyy", { locale: es })
          : "-"}
      </TableCell>
    </TableRow>
  );
};

interface GroupPageClientProps {
  group: Group;
}

export function GroupPageClient({ group }: GroupPageClientProps) {
  const totalTasks = group.tasks.length;
  const completedTasks = group.tasks.filter(
    (task) => task.estado?.name === "Completado"
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <GroupHeader
        id={group.id}
        name={group.name}
        description={group.description}
      />

      <GroupStats
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
      />

      <GroupMembers owner={group.owner} members={group.users} />

      <GroupTasks
        groupId={group.id}
        groupName={group.name}
        tasks={group.tasks}
      />
    </div>
  );
}
