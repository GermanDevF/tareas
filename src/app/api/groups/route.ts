// app/api/groups/route.ts

import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

async function getGroups(userId: string) {
  try {
    const groups = await db.group.findMany({
      where: {
        OR: [{ ownerId: userId }, { users: { some: { userId: userId } } }],
      },
      include: {
        _count: {
          select: {
            users: true,
            tasks: true,
          },
        },
        tasks: {
          take: 5,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(groups, { status: 200 });
  } catch (error) {
    console.error("Error fetching groups:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

async function createGroup(req: NextRequest, userId: string) {
  try {
    const { name, icon, description } = await req.json();

    const group = await db.group.create({
      data: {
        name,
        icon,
        description,
        ownerId: userId,
      },
    });
    return NextResponse.json(group, { status: 201 });
  } catch (error) {
    console.error("Error creating group:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  return getGroups(userId);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  return createGroup(req, userId);
}
