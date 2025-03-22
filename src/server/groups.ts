"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/prisma";

export async function getUserGroups() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return [];
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: { groups: { include: { group: true } } },
  });

  if (!user) {
    return [];
  }

  return user.groups;
}
