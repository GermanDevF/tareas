import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

const uptadteGroup = async (req: NextRequest, userId: string) => {
  try {
    const { name, icon, description, id } = await req.json();
    const group = await db.group.update({
      where: {
        id: id as string,
      },
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
};

const deleteGroup = async (req: NextRequest) => {
  try {
    const id = req.url.split("/").pop() || "";
    await db.group.deleteMany({
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

export const PUT = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  return uptadteGroup(req, userId);
};

export const DELETE = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return deleteGroup(req);
};
