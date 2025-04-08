"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Group, Task } from "@prisma/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { GithubIcon, Plus } from "lucide-react";
import Link from "next/link";

type GroupWithTasks = Group & {
  tasks: (Task & {
    type: { name: string; color: string } | null;
    estado: { name: string } | null;
    lideres: { user: { name: string | null; image: string | null } } | null;
    programador: { user: { name: string | null; image: string | null } } | null;
    ambiente: { name: string } | null;
    proyecto: { name: string } | null;
  })[];
};

interface GroupTasksClientProps {
  group: GroupWithTasks;
}

// Componente para el encabezado
function GroupHeader({ group }: { group: GroupWithTasks }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h1 className="text-xl sm:text-2xl font-bold">Tareas de {group.name}</h1>
      <Button asChild size="sm" className="w-full sm:w-auto">
        <Link href={`/groups/${group.id}__${group.name}/tasks/new`}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Tarea
        </Link>
      </Button>
    </div>
  );
}

// Componente para la vista de escritorio
function DesktopView({ tasks }: { tasks: GroupWithTasks["tasks"] }) {
  if (tasks.length === 0) {
    return (
      <TableRow>
        <TableCell
          colSpan={14}
          className="text-center py-6 text-muted-foreground">
          No hay tareas en este grupo
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {tasks.map((task) => (
        <TableRow
          key={task.id}
          className="cursor-pointer hover:bg-muted/50"
          onClick={() =>
            (window.location.href = `tasks/${task.title}__${task.id}`)
          }>
          <TableCell className="font-medium">{task.title}</TableCell>
          <TableCell>{task.ambiente?.name || "-"}</TableCell>
          <TableCell>{task.estado?.name || "-"}</TableCell>
          <TableCell>{task.proyecto?.name || "-"}</TableCell>
          <TableCell>{task.lideres?.user?.name || "-"}</TableCell>
          <TableCell>{task.programador?.user?.name || "-"}</TableCell>
          <TableCell>{task.claveZoho || "-"}</TableCell>
          <TableCell>{task.branch || "-"}</TableCell>
          <TableCell>{task.type?.name || "-"}</TableCell>
          <TableCell>
            {task.linkPr ? (
              <Link href={task.linkPr} target="_blank">
                <GithubIcon className="w-4 h-4" />
              </Link>
            ) : (
              "-"
            )}
          </TableCell>
          <TableCell>
            {task.startDate
              ? format(new Date(task.startDate), "dd/MM/yyyy", {
                  locale: es,
                })
              : "-"}
          </TableCell>
          <TableCell>
            {task.endDate
              ? format(new Date(task.endDate), "dd/MM/yyyy", {
                  locale: es,
                })
              : "-"}
          </TableCell>
          <TableCell>
            {task.endDate
              ? format(new Date(task.endDate), "dd/MM/yyyy", {
                  locale: es,
                })
              : "-"}
          </TableCell>
          <TableCell>
            {task.devDate
              ? format(new Date(task.devDate), "dd/MM/yyyy", {
                  locale: es,
                })
              : "-"}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

// Componente para la vista de tablet
function TabletView({ tasks }: { tasks: GroupWithTasks["tasks"] }) {
  if (tasks.length === 0) {
    return (
      <TableRow>
        <TableCell
          colSpan={6}
          className="text-center py-6 text-muted-foreground">
          No hay tareas en este grupo
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {tasks.map((task) => (
        <TableRow key={task.id}>
          <TableCell className="font-medium">
            <Link
              href={`tasks/${task.title}__${task.id}`}
              className="hover:underline">
              {task.title}
            </Link>
          </TableCell>
          <TableCell>
            {task.type && (
              <Badge style={{ backgroundColor: task.type.color }}>
                {task.type.name}
              </Badge>
            )}
          </TableCell>
          <TableCell>
            {task.estado && <Badge variant="outline">{task.estado.name}</Badge>}
          </TableCell>
          <TableCell>{task.lideres?.user?.name || "-"}</TableCell>
          <TableCell>{task.programador?.user?.name || "-"}</TableCell>
          <TableCell>
            <div className="text-xs">
              {task.startDate && (
                <div>
                  Inicio:{" "}
                  {format(new Date(task.startDate), "dd/MM/yyyy", {
                    locale: es,
                  })}
                </div>
              )}
              {task.endDate && (
                <div>
                  Fin:{" "}
                  {format(new Date(task.endDate), "dd/MM/yyyy", {
                    locale: es,
                  })}
                </div>
              )}
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

// Componente para la tarjeta de tarea en vista móvil
function TaskCard({ task }: { task: GroupWithTasks["tasks"][0] }) {
  return (
    <Link href={`tasks/${task.title}__${task.id}`}>
      <Card className="overflow-hidden hover:bg-muted/50 transition-colors">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
            <CardTitle className="text-lg">{task.title}</CardTitle>
            <div className="flex gap-2">
              {task.type && (
                <Badge style={{ backgroundColor: task.type.color }}>
                  {task.type.name}
                </Badge>
              )}
              {task.estado && (
                <Badge variant="outline">{task.estado.name}</Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {task.lideres && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Líder:</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={task.lideres.user.image || undefined}
                          />
                          <AvatarFallback>
                            {task.lideres.user.name?.charAt(0) || "L"}
                          </AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{task.lideres.user.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
              {task.programador && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Programador:
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={task.programador.user.image || undefined}
                          />
                          <AvatarFallback>
                            {task.programador.user.name?.charAt(0) || "P"}
                          </AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{task.programador.user.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
              {task.ambiente && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Ambiente:
                  </span>
                  <Badge variant="secondary">{task.ambiente.name}</Badge>
                </div>
              )}
              {task.proyecto && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Proyecto:
                  </span>
                  <Badge variant="secondary">{task.proyecto.name}</Badge>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
              {task.startDate && (
                <div>
                  Inicio:{" "}
                  {format(new Date(task.startDate), "PPP", {
                    locale: es,
                  })}
                </div>
              )}
              {task.endDate && (
                <div>
                  Fin:{" "}
                  {format(new Date(task.endDate), "PPP", {
                    locale: es,
                  })}
                </div>
              )}
              {task.devDate && (
                <div>
                  Desarrollo:{" "}
                  {format(new Date(task.devDate), "PPP", {
                    locale: es,
                  })}
                </div>
              )}
              {task.prodDate && (
                <div>
                  Producción:{" "}
                  {format(new Date(task.prodDate), "PPP", {
                    locale: es,
                  })}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Componente para la vista móvil
function MobileView({ tasks }: { tasks: GroupWithTasks["tasks"] }) {
  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No hay tareas en este grupo
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export function GroupTasksClient({ group }: GroupTasksClientProps) {
  return (
    <div className="">
      <GroupHeader group={group} />

      {/* Vista de escritorio - visible solo en lg y superiores */}
      <div className="hidden lg:block rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Ambiente</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Proyecto</TableHead>
              <TableHead>Líder</TableHead>
              <TableHead>Programador</TableHead>
              <TableHead>Clave Zoho</TableHead>
              <TableHead>Rama</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>PR</TableHead>
              <TableHead>Inicio de desarrollo</TableHead>
              <TableHead>Fecha comprometida</TableHead>
              <TableHead>Fecha en pruebas</TableHead>
              <TableHead>Fecha de producción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <DesktopView tasks={group.tasks} />
          </TableBody>
        </Table>
      </div>

      {/* Vista de tablet - visible solo en md y lg */}
      <div className="hidden md:block lg:hidden rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Líder</TableHead>
              <TableHead>Programador</TableHead>
              <TableHead>Fechas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TabletView tasks={group.tasks} />
          </TableBody>
        </Table>
      </div>

      {/* Vista móvil - visible solo en sm y menores */}
      <div className="md:hidden">
        <MobileView tasks={group.tasks} />
      </div>
    </div>
  );
}
