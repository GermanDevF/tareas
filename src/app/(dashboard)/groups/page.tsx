import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ClientGroups } from "@/components/groups/client-groups";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";

async function getGroups() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return [];
  }

  const groups = await db.group
    .findMany({
      where: {
        OR: [
          { ownerId: session.user.id },
          { users: { some: { userId: session.user.id } } },
        ],
      },
      include: {
        owner: {
          select: {
            name: true,
          },
        },
        tasks: {
          take: 5,
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: {
            users: true,
            tasks: true,
          },
        },
      },
    })
    .then((groups) =>
      groups.map((group) => ({
        ...group,
        owner: {
          ...group.owner,
          name: group.owner?.name ?? "Sin nombre",
        },
      }))
    );

  return groups;
}

export default async function GroupsPage() {
  const groups = await getGroups();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mis Grupos</h1>
      <ClientGroups groups={groups} />
    </div>
  );
}
