import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Icon from "@/components/get-icon";
import { Button } from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getDashboardData } from "@/server";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard de usuario",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">No autenticado</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Debes iniciar sesión para acceder al dashboard
            </p>
            <Button asChild>
              <Link href="/login">Iniciar sesión</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const dashboardData = (await getDashboardData(session.user.id)) || {
    name: "Cargando...",
    email: "Cargando...",
    groups: [],
    tasks: [],
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido de nuevo, {dashboardData.name}
          </p>
        </div>
        <Button asChild>
          <Link href="/groups/new">Crear nuevo grupo</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Perfil del Usuario */}
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={session.user.image || ""} />
                <AvatarFallback>
                  {dashboardData.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{dashboardData.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {dashboardData.email}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <p className="text-2xl font-bold">
                  {dashboardData.groups.length}
                </p>
                <p className="text-sm text-muted-foreground">Grupos</p>
              </div>
              <Separator orientation="vertical" />
              <div>
                <p className="text-2xl font-bold">
                  {dashboardData.tasks.length}
                </p>
                <p className="text-sm text-muted-foreground">Tareas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grupos del Usuario */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Mis Grupos</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/groups">Ver todos</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              {dashboardData.groups.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No tienes grupos aún
                </p>
              ) : (
                <div className="space-y-4">
                  {dashboardData.groups.map((group) => (
                    <div
                      key={group.id}
                      className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-muted p-2 rounded-md">
                          <Icon
                            iconName={group.icon || "Users"}
                            className="size-4"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{group.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {
                              dashboardData.tasks.filter(
                                (task) => task.groupName === group.name
                              ).length
                            }{" "}
                            tareas
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/groups/${group.id}`}>
                          <Icon iconName="ArrowRight" className="size-4" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Tareas del Usuario */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Tareas Recientes</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/tasks">Ver todas</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              {dashboardData.tasks.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No tienes tareas pendientes
                </p>
              ) : (
                <div className="space-y-4">
                  {dashboardData.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{task.groupName}</Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/tasks/${task.id}`}>
                          <Icon iconName="ArrowRight" className="size-4" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
