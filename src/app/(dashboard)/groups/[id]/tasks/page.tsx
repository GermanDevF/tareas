import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { GroupTasksClient } from "@/components/tasks/group-tasks-client";
import { db } from "@/lib/prisma";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface GroupTasksPageProps {
  params: { id: string };
}

async function getGroupWithTasks(id: string, userId: string) {
  return await db.group.findFirst({
    where: {
      id,
      OR: [{ ownerId: userId }, { users: { some: { userId: userId } } }],
    },
    include: {
      tasks: {
        orderBy: { createdAt: "desc" },
        include: {
          type: true,
          estado: true,
          group: {
            select: {
              name: true,
            },
          },
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
          ambiente: {
            select: {
              name: true,
            },
          },
          proyecto: {
            select: {
              name: true,
            },
          },
        },
      },
      owner: {
        include: {
          ownedGroups: true,
        },
      },
    },
  });
}

export async function generateMetadata({
  params,
}: GroupTasksPageProps): Promise<Metadata> {
  const _params = await params;
  const idParts = _params.id.split("__");
  const id = idParts.length > 1 ? idParts[1] : null;
  if (!id) {
    return {
      title: "Grupo no encontrado",
      description: "El grupo que buscas no existe",
    };
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      title: "No autorizado",
      description: "No tienes permiso para ver este grupo",
    };
  }

  const group = await getGroupWithTasks(id, session.user.id);

  if (!group) {
    return {
      title: "Grupo no encontrado",
      description:
        "El grupo que buscas no existe o no tienes permiso para verlo",
    };
  }

  return {
    title: `Tareas de ${group.name}`,
    description: `Tareas del grupo ${group.name}`,
  };
}

export default async function GroupTasksPage({ params }: GroupTasksPageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    notFound();
  }

  const _params = await params;
  const idParts = _params.id.split("__");
  const id = idParts.length > 1 ? idParts[1] : null;
  if (!id) {
    notFound();
  }

  const group = await getGroupWithTasks(id, session.user.id);

  if (!group) {
    notFound();
  }

  return <GroupTasksClient group={group} />;
}
