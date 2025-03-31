import { Group, GroupPageClient } from "@/components/tasks/group-page-client";
import { db } from "@/lib/prisma";
import { SearchParams } from "next/dist/server/request/search-params";

interface GroupPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata({ params }: GroupPageProps) {
  const { id: _id } = await params;
  const [, id] = _id.split("__");

  const group = await db.group.findUnique({
    where: { id },
    select: { name: true },
  });

  return {
    title: group?.name || "Grupo",
    description: `Página del grupo ${group?.name}`,
  };
}

const GroupPage = async ({ params, searchParams }: GroupPageProps) => {
  const search = (await searchParams) as {
    filters?: string;
    sort?: string;
  };

  console.log("searchParams", search?.filters?.split(","));

  const { id: _id } = await params;

  const [, id] = _id.split("__");

  const group = await db.group.findUnique({
    where: { id },
    include: {
      tasks: { orderBy: { createdAt: "desc" } },
      owner: {
        include: {
          ownedGroups: true,
        },
      },
      users: {
        include: {
          user: {
            include: {
              groups: true,
              ownedGroups: true,
              tasks: true,
            },
            omit: {
              password: true,
              emailVerified: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!group) {
    return <p>Grupo no encontrado</p>;
  }

  return <GroupPageClient group={group as Group} />;
};

export default GroupPage;
