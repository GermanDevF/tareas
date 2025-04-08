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
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import { memo } from "react";
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

interface GroupCardProps {
  group: LocalGroup;
  isLoading: boolean;
  owner: string;
}

const GroupStats = memo(({ users, tasks }: Count) => (
  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
    <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm">
      <Icon iconName="Users" className="size-5 text-blue-500 mb-1" />
      <span className="text-lg font-semibold">{users}</span>
      <span className="text-xs text-gray-500">
        {users === 1 ? "miembro" : "miembros"}
      </span>
    </div>
    <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm">
      <Icon iconName="CalendarCheck" className="size-5 text-green-500 mb-1" />
      <span className="text-lg font-semibold">{tasks}</span>
      <span className="text-xs text-gray-500">
        {tasks === 1 ? "tarea" : "tareas"}
      </span>
    </div>
  </div>
));

GroupStats.displayName = "GroupStats";

const GroupStatsSkeleton = () => (
  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
    <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm">
      <div className="size-5 bg-blue-200 dark:bg-blue-800 mb-1 rounded-full w-5 h-5"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 w-10 mb-1 rounded"></div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 w-16 rounded"></div>
    </div>
    <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm">
      <div className="size-5 bg-green-200 dark:bg-green-800 mb-1 rounded-full w-5 h-5"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 w-10 mb-1 rounded"></div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 w-16 rounded"></div>
    </div>
  </div>
);

const TaskItem = memo(({ task }: { task: Task }) => (
  <div className="flex items-center justify-between p-3 rounded-lg gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div className="flex-shrink-0">
        <Icon iconName="CalendarCheck2" className="size-5 text-blue-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{task.title}</p>
        <p className="text-xs text-gray-500">
          {format(new Date(task.createdAt), "d MMM yyyy", { locale: es })}
        </p>
      </div>
    </div>
  </div>
));

TaskItem.displayName = "TaskItem";

const TaskList = memo(({ tasks }: { tasks: Task[] }) => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-2 px-1">
      <Icon iconName="ListChecks" className="size-5 text-blue-500" />
      <span className="text-sm font-medium">
        Últimas{" "}
        {huminizeCount({
          count: tasks?.length >= 5 ? 5 : tasks?.length,
          singular: "tarea asignada",
          plural: "tareas asignadas",
        })}
      </span>
    </div>
    <ScrollArea className="h-40 rounded-lg border bg-white dark:bg-gray-800/50">
      <div className="p-2 space-y-1">
        {tasks?.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </ScrollArea>
  </div>
));

TaskList.displayName = "TaskList";

const TaskListSkeleton = () => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-2 px-1">
      <div className="size-5 bg-blue-200 dark:bg-blue-800 rounded-full w-5 h-5"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 w-32 rounded"></div>
    </div>
    <ScrollArea className="h-40 rounded-lg border bg-white dark:bg-gray-800/50">
      <div className="p-2 space-y-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0">
                <div className="size-5 bg-blue-200 dark:bg-blue-800 rounded-full w-5 h-5"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 w-24 mb-1 rounded"></div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 w-16 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  </div>
);

const GroupActions = memo(({ group, isLoading, owner }: GroupCardProps) => (
  <CardAction className="flex mt-auto w-full flex-col gap-2 p-4">
    <div className="flex flex-col gap-2">
      <DialogCreateTask group={group} />
      <Button className="w-full" variant="secondary">
        <Icon iconName="Users" className="size-4 mr-2" />
        Miembros
      </Button>
    </div>
    <Button className="w-full" variant="outline" asChild>
      <Link
        href={`/groups/${group.name}__${group.id}`}
        className="flex items-center justify-center">
        <Icon iconName="Eye" className="size-4 mr-2" />
        Ver Detalles
      </Link>
    </Button>
  </CardAction>
));

GroupActions.displayName = "GroupActions";

const GroupActionsSkeleton = () => (
  <CardAction className="flex mt-auto w-full flex-col gap-2 p-4">
    <div className="grid grid-cols-2 gap-2">
      <div className="h-10 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
    </div>
    <div className="h-10 bg-gray-200 dark:bg-gray-700 w-full rounded mt-2"></div>
  </CardAction>
);

export const GroupCard = memo(({ group, isLoading, owner }: GroupCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 p-5 flex flex-col bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-gray-100 dark:border-gray-700">
      <CardHeader className="flex flex-col sm:flex-row items-center gap-4 pb-4 border-b dark:border-gray-700">
        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors duration-200">
          <Icon
            iconName={group.icon || "Users"}
            className="size-8 text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200"
          />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold">{group.name}</h2>
          {group?.description && (
            <CardDescription className="line-clamp-2 text-sm mt-1">
              {group.description}
            </CardDescription>
          )}
          <p className="text-sm text-gray-500 mt-1">Propietario: {owner}</p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 mt-4">
        {isLoading ? (
          <GroupStatsSkeleton />
        ) : (
          <GroupStats users={group._count.users} tasks={group._count.tasks} />
        )}

        {isLoading ? (
          <TaskListSkeleton />
        ) : group?.tasks.length > 0 ? (
          <TaskList tasks={group.tasks} />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <Icon
              iconName="ClipboardList"
              className="size-8 text-gray-400 mb-2"
            />
            <span className="text-sm text-gray-500">Sin tareas asignadas</span>
          </div>
        )}
      </CardContent>

      {isLoading ? (
        <GroupActionsSkeleton />
      ) : (
        <GroupActions group={group} isLoading={isLoading} owner={owner} />
      )}
    </Card>
  );
});
