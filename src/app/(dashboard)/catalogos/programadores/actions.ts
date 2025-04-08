"use server";

import { ProgramadorState } from "@/@types";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ProgramadorSchema = z.object({
  userId: z.string().min(1, {
    message: "El usuario es requerido",
  }),
});

export type State = {
  errors?:
    | {
        userId?: string[];
      }
    | undefined;
  message: string;
};

export async function getAllProgramadores() {
  return await db.programador.findMany({
    include: {
      user: true,
    },
    orderBy: {
      user: {
        name: "asc",
      },
    },
  });
}

export async function getProgramadorById(id: string) {
  return await db.programador.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
}

export async function getAvailableUsers() {
  const existingProgramadores = await db.programador.findMany({
    select: {
      userId: true,
    },
  });

  const existingUserIds = existingProgramadores.map(
    (programador) => programador.userId
  );

  return await db.user.findMany({
    where: {
      id: {
        notIn: existingUserIds,
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function createProgramador(formData: FormData) {
  const validatedFields = ProgramadorSchema.safeParse({
    userId: formData.get("userId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos inválidos. No se pudo crear el programador.",
    };
  }

  try {
    await db.programador.create({
      data: {
        userId: validatedFields.data.userId,
      },
    });
  } catch (error) {
    return {
      message: "Error de base de datos: No se pudo crear el programador.",
    };
  }

  revalidatePath("/catalogos/programadores");
  redirect("/catalogos/programadores");
}

export async function updateProgramador(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = ProgramadorSchema.safeParse({
    userId: formData.get("userId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos inválidos. No se pudo actualizar el programador.",
    };
  }

  try {
    await db.programador.update({
      where: { id },
      data: {
        userId: validatedFields.data.userId,
      },
    });
  } catch (error) {
    return {
      message: "Error de base de datos: No se pudo actualizar el programador.",
    };
  }

  revalidatePath("/catalogos/programadores");
  redirect("/catalogos/programadores");
}

export async function deleteProgramador(
  prevState: ProgramadorState,
  formData: FormData
): Promise<ProgramadorState> {
  const id = formData.get("id") as string;

  try {
    await db.programador.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error al eliminar el programador:", error);
    return {
      message:
        "Error al eliminar el programador. Por favor, verifica que el programador existe y que no está asociado a otras entidades.",
      errors: {
        userId: [error instanceof Error ? error.message : "Error desconocido"],
      },
    };
  }

  revalidatePath("/catalogos/programadores");
  redirect("/catalogos/programadores");
}
