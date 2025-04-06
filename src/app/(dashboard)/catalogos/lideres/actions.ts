"use server";

import { LiderState } from "@/@types";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const LiderSchema = z.object({
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

export async function getAllLideres() {
  return await db.lider.findMany({
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

export async function getLiderById(id: string) {
  return await db.lider.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
}

export async function getAvailableUsers() {
  const existingLideres = await db.lider.findMany({
    select: {
      userId: true,
    },
  });

  const existingUserIds = existingLideres.map((lider) => lider.userId);

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

export async function createLider(formData: FormData) {
  const validatedFields = LiderSchema.safeParse({
    userId: formData.get("userId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos inválidos. No se pudo crear el líder.",
    };
  }

  try {
    await db.lider.create({
      data: {
        userId: validatedFields.data.userId,
      },
    });
  } catch (error) {
    return {
      message: "Error de base de datos: No se pudo crear el líder.",
    };
  }

  revalidatePath("/catalogos/lideres");
  redirect("/catalogos/lideres");
}

export async function updateLider(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = LiderSchema.safeParse({
    userId: formData.get("userId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos inválidos. No se pudo actualizar el líder.",
    };
  }

  try {
    await db.lider.update({
      where: { id },
      data: {
        userId: validatedFields.data.userId,
      },
    });
  } catch (error) {
    return {
      message: "Error de base de datos: No se pudo actualizar el líder.",
    };
  }

  revalidatePath("/catalogos/lideres");
  redirect("/catalogos/lideres");
}

export async function deleteLider(
  prevState: LiderState,
  formData: FormData
): Promise<LiderState> {
  const id = formData.get("id") as string;

  try {
    await db.lider.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return {
      message: "Error al eliminar el líder",
      errors: {},
    };
  }

  revalidatePath("/catalogos/lideres");
  redirect("/catalogos/lideres");
}
