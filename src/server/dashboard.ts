import { db } from "@/lib/prisma";

export async function getDashboardData(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      groups: {
        include: {
          group: true,
        },
      },
      tasks: true,
    },
  });

  const groups = await db.group.findMany({
    where: {
      OR: [{ users: { some: { id: userId } } }, { ownerId: userId }],
    },
  });

  if (!user) {
    return null;
  }

  return {
    name: user.name,
    email: user.email,
    groups: groups.map((group) => ({
      id: group.id,
      name: group.name,
      icon: group.icon,
    })),
    tasks: user.tasks.map((task: any) => ({
      id: task.id,
      title: task.title,
      groupName: task.group?.name || "Sin grupo",
    })),
  };
}
