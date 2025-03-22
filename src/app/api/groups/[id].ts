import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Update group by ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { name } = await request.json();
  const updatedGroup = await prisma.group.update({
    where: { id },
    data: { name },
  });
  return NextResponse.json(updatedGroup);
}

// Delete group by ID
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await prisma.group.delete({ where: { id } });
  return NextResponse.json({ message: "Group deleted" });
}

// Get group by ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const group = await prisma.group.findUnique({
    where: { id },
    include: {
      users: true,
    },
  });
  return NextResponse.json(group);
}

// Partially update group by ID
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { name } = await request.json();
  const updatedGroup = await prisma.group.update({
    where: { id },
    data: { name },
  });
  return NextResponse.json(updatedGroup);
}
