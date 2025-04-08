import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

const getTask = async (req: NextRequest, userId: string) => {
  try {
    const id = req.url.split("/").pop() || "";

    // Obtener la tarea con su grupo
    const task = await db.task.findUnique({
      where: {
        id: id as string,
      },
      include: {
        group: true,
      },
    });

    if (!task) {
      return NextResponse.json(
        { message: "Tarea no encontrada" },
        { status: 404 }
      );
    }

    // Si la tarea pertenece a un grupo, verificar si el usuario tiene acceso
    if (task.groupId) {
      const group = await db.group.findFirst({
        where: {
          id: task.groupId,
          OR: [{ ownerId: userId }, { users: { some: { userId: userId } } }],
        },
      });

      if (!group) {
        return NextResponse.json(
          { message: "No tienes permiso para acceder a esta tarea" },
          { status: 403 }
        );
      }
    }

    // Si la tarea no pertenece a un grupo o el usuario tiene acceso, devolver la tarea completa
    const taskWithDetails = await db.task.findUnique({
      where: {
        id: id as string,
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
        user: true,
      },
    });

    return NextResponse.json(taskWithDetails, { status: 200 });
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

const deleteTask = async (req: NextRequest, userId: string) => {
  try {
    const id = req.url.split("/").pop() || "";

    // Obtener la tarea con su grupo
    const task = await db.task.findUnique({
      where: {
        id: id as string,
      },
      include: {
        group: true,
      },
    });

    if (!task) {
      return NextResponse.json(
        { message: "Tarea no encontrada" },
        { status: 404 }
      );
    }

    // Si la tarea pertenece a un grupo, verificar si el usuario tiene acceso
    if (task.groupId) {
      const group = await db.group.findFirst({
        where: {
          id: task.groupId,
          OR: [{ ownerId: userId }, { users: { some: { userId: userId } } }],
        },
      });

      if (!group) {
        return NextResponse.json(
          { message: "No tienes permiso para eliminar esta tarea" },
          { status: 403 }
        );
      }
    }

    // Si la tarea no pertenece a un grupo o el usuario tiene acceso, eliminar la tarea
    await db.task.delete({
      where: {
        id: id as string,
      },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

const uptadteTask = async (req: NextRequest, userId: string) => {
  try {
    const { id, ...data } = await req.json();

    // Obtener la tarea con su grupo
    const task = await db.task.findUnique({
      where: {
        id: id as string,
      },
      include: {
        group: true,
      },
    });

    if (!task) {
      return NextResponse.json(
        { message: "Tarea no encontrada" },
        { status: 404 }
      );
    }

    // Si la tarea pertenece a un grupo, verificar si el usuario tiene acceso
    if (task.groupId) {
      const group = await db.group.findFirst({
        where: {
          id: task.groupId,
          OR: [{ ownerId: userId }, { users: { some: { userId: userId } } }],
        },
      });

      if (!group) {
        return NextResponse.json(
          { message: "No tienes permiso para actualizar esta tarea" },
          { status: 403 }
        );
      }
    }

    // Si la tarea no pertenece a un grupo o el usuario tiene acceso, actualizar la tarea
    const updatedTask = await db.task.update({
      where: {
        id: id as string,
      },
      data,
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  return getTask(req, userId);
};

export const DELETE = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  return deleteTask(req, userId);
};

export const PUT = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  return uptadteTask(req, userId);
};
