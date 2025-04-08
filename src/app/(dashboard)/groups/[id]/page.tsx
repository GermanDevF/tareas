import { Group, GroupPageClient } from "@/components/tasks/group-page-client";
import { db } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface GroupPageProps {
  params: { id: string };
  searchParams: {
    filters?: string;
    sort?: string;
  };
}

async function getGroup(id: string) {
  return await db.group.findUnique({
    where: { id },
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
      users: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              isAdmin: true,
              groups: true,
              ownedGroups: true,
              tasks: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}

export async function generateMetadata({
  params,
}: GroupPageProps): Promise<Metadata> {
  const idParts = params.id.split("__");
  const id = idParts.length > 1 ? idParts[1] : null;
  if (!id) {
    return {
      title: "Grupo no encontrado",
      description: "El grupo que buscas no existe",
    };
  }
  const group = await getGroup(id);

  if (!group) {
    return {
      title: "Grupo no encontrado",
      description: "El grupo que buscas no existe",
    };
  }

  return {
    title: group.name,
    description: `Página del grupo ${group.name}`,
  };
}

export default async function GroupPage({
  params,
  searchParams,
}: GroupPageProps) {
  const idParts = params.id.split("__");
  const id = idParts.length > 1 ? idParts[1] : null;
  if (!id) {
    notFound();
  }
  const group = await getGroup(id);

  if (!group) {
    notFound();
  }

  return <GroupPageClient group={group as unknown as Group} />;
}
