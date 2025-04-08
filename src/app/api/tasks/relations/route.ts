import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  try {
    const [tipos, estados, lideres, programadores, ambientes, proyectos] =
      await Promise.all([
        db.tipoDeTarea.findMany({ select: { id: true, name: true } }),
        db.estado.findMany({ select: { id: true, name: true } }),
        db.lider.findMany({
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        }),
        db.programador.findMany({
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        }),
        db.ambiente.findMany({ select: { id: true, name: true } }),
        db.proyecto.findMany({ select: { id: true, name: true } }),
      ]);

    return NextResponse.json({
      tipos,
      estados,
      lideres: lideres.map((l) => ({
        ...l,
        ...l.user,
        id: l.id,
      })),
      programadores: programadores.map((p) => ({
        ...p,
        ...p.user,
        id: p.id,
      })),
      ambientes,
      proyectos,
    });
  } catch (error) {
    console.error("Error al obtener las relaciones:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
