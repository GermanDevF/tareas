import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const groups = await db.group.findMany({
      where: {
        OR: [{ ownerId: userId }, { users: { some: { userId: userId } } }],
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
