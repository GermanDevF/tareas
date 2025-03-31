import { db } from "@/lib/prisma";
import { Task } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

async function getTasks(userId: string) {
  try {
    const tasks = await db.task.findMany({
      where: {
        userId: userId,
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
}

async function createTask(req: NextRequest, userId: string) {
  try {
    const {
      content,
      title,
      groupId,
      ambienteId,
      branch,
      claveZoho,
      devDate,
      endDate,
      liderId,
      linkPr,
      estadoId,
      prodDate,
      programadorId,
      projectId,
      startDate,
      typeId,
      validado,
      userId: _userId,
    } = (await req.json()) as Omit<Task, "id" | "createdAt" | "updatedAt">;

    const task = await db.task.create({
      data: {
        title,
        userId: _userId || userId,
        content,
        groupId,
        ambienteId,
        branch,
        claveZoho,
        devDate,
        endDate,
        liderId,
        linkPr,
        estadoId,
        prodDate,
        programadorId,
        projectId,
        startDate,
        typeId,
        validado,
      },
    });
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return getTasks(userId);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return createTask(req, session.user.id);
}
