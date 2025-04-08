// app/api/users/route.ts
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const excludeLeaders = searchParams.get("excludeLeaders");
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        isAdmin: true,
        lideres: true,
      },
    });

    if (excludeLeaders === "true") {
      const leadersIds = users
        .filter((user) => user.lideres.length)
        .map((user) => user.id);
      return NextResponse.json(
        users.filter((user) => !leadersIds.includes(user.id))
      );
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
