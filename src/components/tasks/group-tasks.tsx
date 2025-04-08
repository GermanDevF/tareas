import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarDays, ClipboardList } from "lucide-react";
import Link from "next/link";

interface GroupTask {
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
}

interface GroupTasksProps {
  groupId: string;
  groupName: string;
  tasks: GroupTask[];
}

export function GroupTasks({ groupId, groupName, tasks }: GroupTasksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Últimas Tareas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{task.title}</p>
                <div className="flex gap-2 mt-2">
                  {task.type && (
                    <Badge variant="outline">{task.type.name}</Badge>
                  )}
                  {task.estado && (
                    <Badge
                      variant="secondary"
                      className={
                        task.estado.name === "Completado"
                          ? "bg-green-500"
                          : task.estado.name === "En Progreso"
                          ? "bg-yellow-500"
                          : ""
                      }>
                      {task.estado.name}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  {format(new Date(task.createdAt), "PPP", { locale: es })}
                </div>
              </div>
            </div>
          ))}
          {tasks.length > 5 && (
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/groups/${groupName}__${groupId}/tasks`}>
                Ver todas las tareas
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
