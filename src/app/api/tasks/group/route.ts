import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

const getTasksByGroup = async (groupId: string, userId: string) => {
  try {
    // Primero verificar si el usuario tiene acceso al grupo
    const group = await db.group.findFirst({
      where: {
        id: groupId,
        OR: [{ ownerId: userId }, { users: { some: { userId: userId } } }],
      },
    });

    if (!group) {
      return NextResponse.json(
        { message: "No tienes permiso para acceder a este grupo" },
        { status: 403 }
      );
    }

    // Si el usuario tiene acceso, obtener las tareas del grupo
    const tasks = await db.task.findMany({
      where: {
        groupId: groupId,
      },
      include: {
        type: true,
        estado: true,
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
        ambiente: true,
        proyecto: true,
      },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export async function GET(
  req: NextRequest,
  { params }: { params: { groupId: string } }
) {
  const { groupId } = params;
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!groupId) {
    return NextResponse.json(
      { message: "Group ID is required" },
      { status: 400 }
    );
  }

  return getTasksByGroup(groupId, userId);
}
