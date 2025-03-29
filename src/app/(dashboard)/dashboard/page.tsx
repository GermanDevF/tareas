import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Icon from "@/components/get-icon";
import { Button } from "@/components/ui";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardData } from "@/server";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard de usuario",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return <p>No autenticado.</p>;
  }

  const dashboardData = (await getDashboardData(session.user.id)) || {
    name: "Cargando...",
    email: "Cargando...",
    groups: [],
    tasks: [],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Profile */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Perfil del Usuario</h2>
            <p>Nombre: {dashboardData.name}</p>
            <p>Email: {dashboardData.email}</p>
            <p>Grupos: {dashboardData.groups.length}</p>
            <p>Tareas: {dashboardData.tasks.length}</p>
          </CardContent>
        </Card>

        {/* User Groups */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Mis Grupos</h2>
            {dashboardData.groups.map((group) => (
              <div key={group.id} className="mb-2 flex justify-between">
                <div className="flex items-center">
                  <Icon
                    iconName={group.icon || "Users"}
                    className="size-4 mr-2"
                  />
                  {group.name}
                </div>
                <div className="flex justify-end gap-2">
                  <Button size={"sm"} variant={"outline"}>
                    Add Task
                  </Button>
                  <Button size={"sm"} variant={"outline"}>
                    Add Users
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* User Tasks */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Mis Tareas</h2>
            {dashboardData.tasks.map((task) => (
              <div key={task.id} className="mb-2">
                <p>{task.title}</p>
                <p>Grupo: {task.groupName}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
