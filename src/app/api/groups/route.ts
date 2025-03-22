import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json([]);
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { groups: { include: { group: true } } },
  });
  if (!user) {
    return NextResponse.json([]);
  }
  const { name } = await request.json();
  const newGroup = await prisma.group.create({
    data: {
      name,
      ownerId: user.id,
    },
  });
  return NextResponse.json(newGroup);
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json([]);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { groups: { include: { group: true } } },
  });

  if (!user) {
    return NextResponse.json([]);
  }
  const groups = user.groups.map((group) => ({
    id: group.group.id,
    name: group.group.name,
    icon: group.group.icon || "",
    ownerId: group.group.ownerId,
    description: group.group.description || "",
  }));

  return NextResponse.json(groups);
}
