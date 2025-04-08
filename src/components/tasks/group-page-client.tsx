"use client";

import Icon from "@/components/get-icon";
import { DialogCreateTask } from "@/components/tasks/dialog-create-task";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiltersDialog } from "./filters-dialog";

export interface Group {
  id: string;
  name: string;
  icon: string;
  description: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: Task[];
  owner: Owner;
  users: User[];
}

export interface User {
  id: string;
  userId: string;
  groupId: string;
  createdAt: Date;
  user?: Owner;
}

export interface Owner {
  id: string;
  email: string;
  name: string;
  image: string;
  ownedGroups: OwnedGroup[];
  groups?: User[];
  tasks?: Task[];
}

export interface OwnedGroup {
  id: string;
  name: string;
  icon: string;
  description: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  content?: string;
  userId: string;
  groupId: string;
  createdAt: Date;
  updatedAt: Date;
  type?: { name: string; color: string };
  estado?: { name: string };
  lideres?: { user: { name: string } };
  programador?: { user: { name: string } };
  ambiente?: { name: string };
  proyecto?: { name: string };
  claveZoho?: string;
  branch?: string;
  linkPr?: string;
  startDate?: Date;
  endDate?: Date;
  prodDate?: Date;
  validado?: boolean;
  group: { name: string };
}

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
      onClick={() =>
        router.push(
          `/groups/${task.group.name}__${task.groupId}/tasks/${task.title}__${task.id}`
        )
      }>
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
    </TableRow>
  );
};

export const GroupPageClient = ({ group }: { group: Group }) => {
  return (
    <div className="w-full h-full space-y-6 p-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <Icon iconName={group?.icon || "Users"} className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold">{group.name}</h1>
            <p className="text-muted-foreground">{group.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FiltersDialog />
          <DialogCreateTask group={group} />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Título</TableHead>
              <TableHead>Ambiente</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Proyecto</TableHead>
              <TableHead>Líder</TableHead>
              <TableHead>Programador</TableHead>
              <TableHead>Clave Zoho</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>PR</TableHead>
              <TableHead>Fecha de creación</TableHead>
              <TableHead>Fecha de inicio</TableHead>
              <TableHead>Fecha de fin</TableHead>
              <TableHead>Fecha de producción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {group.tasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
