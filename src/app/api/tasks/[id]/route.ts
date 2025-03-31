import { db } from "@/lib/prisma";
import { Task } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

const getTask = async (req: NextRequest) => {
  try {
    const id = req.url.split("/").pop() || "";

    const task = await db.task.findUnique({
      where: {
        id: id as string,
      },
    });
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("Error creating group:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

const deleteTask = async (req: NextRequest) => {
  try {
    const id = req.url.split("/").pop() || "";
    await db.task.deleteMany({
      where: {
        id: id as string,
      },
    });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error("Error creating group:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

const uptadteTask = async (req: NextRequest, userId: string) => {
  try {
    const { content, title, groupId, id } = (await req.json()) as Task;
    const task = await db.task.update({
      where: {
        id: id as string,
      },
      data: {
        title,
        userId,
        content,
        groupId,
      },
    });
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Error creating group:", error);
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

  return getTask(req);
};
export const DELETE = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return deleteTask(req);
};
export const PUT = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  return uptadteTask(req, userId);
};
