import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

const getTasksByGroup = async (groupId: string) => {
  try {
    const tasks = await db.task.findMany({
      where: {
        groupId: groupId,
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

  return getTasksByGroup(groupId);
}
