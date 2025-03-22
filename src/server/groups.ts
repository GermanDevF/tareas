import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserGroups() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return [];
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { groups: { include: { group: true } } },
  });

  if (!user) {
    return [];
  }

  return user.groups;
}
