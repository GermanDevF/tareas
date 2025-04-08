import { Group } from "@/components/tasks/group-page-client";
import { getServerSession } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function getGroup(id: string): Promise<Group | null> {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return null;
  }

  const group = await db.group.findFirst({
    where: {
      id,
      OR: [
        { ownerId: session.user.id },
        { users: { some: { userId: session.user.id } } },
      ],
    },
    include: {
      tasks: {
        orderBy: { createdAt: "desc" },
        include: {
          type: true,
          estado: true,
        },
      },
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
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
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!group?.owner) {
    return null;
  }

  return group as Group;
}
