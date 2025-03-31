import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  ScrollArea,
} from "@/components/ui";
import { huminizeCount } from "@/lib/utils";
import { Group, Task } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Icon from "../get-icon";
import { DialogCreateTask } from "../tasks";

interface Count {
  users: number;
  tasks: number;
}

interface LocalGroup extends Group {
  tasks: Task[];
  _count: Count;
}

interface GroupCardProps extends React.FC {
  group: LocalGroup;
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 p-4 flex flex-col">
      <CardHeader className="flex items-center gap-3 w-full">
        <Icon
          iconName={group.icon || "Users"}
          className="size-8 sm:size-10 text-gray-500"
        />
        <h2 className="text-lg sm:text-xl font-semibold">{group.name}</h2>
      </CardHeader>
      <CardDescription className="line-clamp-2 text-sm sm:text-base flex items-center justify-between mx-3">
        <div className="flex items-center gap-2">
          <Icon iconName="Users" className="size-4 mr-1" />
          {huminizeCount({
            count: group._count.users,
            singular: "miembro",
            plural: "miembros",
          })}
        </div>
        <div className="flex items-center gap-2">
          <Icon iconName="CalendarCheck" className="size-4 mr-1" />
          {huminizeCount({
            count: group._count.tasks,
            singular: "tarea",
            plural: "tareas",
          })}
        </div>
      </CardDescription>
      {group?.description && (
        <CardDescription className="line-clamp-2 text-sm sm:text-base px-4">
          {group.description}
        </CardDescription>
      )}
      <CardContent className="flex flex-col gap-2 mt-4">
        {group?.tasks.length > 0 ? (
          <>
            <div className="flex items-center gap-2">
              <Icon iconName="ListChecks" className="size-4 mr-1" />
              <span className="text-sm">
                Últimas{" "}
                {huminizeCount({
                  count: group._count.tasks >= 5 ? 5 : group._count.tasks,
                  singular: "tarea asignada",
                  plural: "tareas asignadas",
                })}
              </span>
            </div>
            <ScrollArea className="h-32 border rounded-md p-2">
              {group.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-2 rounded-md gap-2 dark:odd:bg-gray-800 transition-colors duration-200 odd:bg-gray-100">
                  <div className="flex items-center gap-2">
                    <Icon iconName="CalendarCheck2" className="size-4 " />
                    <span className="text-sm">{task.title}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </ScrollArea>
          </>
        ) : (
          <div className="flex items-center justify-center p-2 rounded-md">
            <span className="text-sm text-gray-500">Sin tareas asignadas</span>
          </div>
        )}
      </CardContent>
      <CardAction className="flex mt-auto w-full xl:flex-row max-w-full flex-wrap gap-2 items-center justify-between">
        <DialogCreateTask group={group} />
        <Button className="w-full xl:w-[48%]" variant="secondary">
          <Icon iconName="Users" className="size-4 mr-2" />
          Agregar Miembros
        </Button>
        {/* Expand button */}
        <Button className="w-full" variant="outline" asChild>
          <Link href={`/groups/${group.name}__${group.id}`}>
            <Icon iconName="Eye" className="size-4 mr-2" />
            Ver Más
          </Link>
        </Button>
      </CardAction>
    </Card>
  );
}
