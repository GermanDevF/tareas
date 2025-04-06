"use server";

import { EstadoState } from "@/@types";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const EstadoSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
});

export async function getAllEstados() {
  return await db.estado.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createEstado(
  prevState: EstadoState,
  formData: FormData
): Promise<EstadoState> {
  const validatedFields = EstadoSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos inválidos",
    };
  }

  try {
    await db.estado.create({
      data: {
        name: validatedFields.data.name,
      },
    });
  } catch (error) {
    return {
      message: "Error al crear el estado",
    };
  }

  revalidatePath("/catalogos/estados");
  redirect("/catalogos/estados");
}

export async function updateEstado(
  id: string,
  prevState: EstadoState,
  formData: FormData
): Promise<EstadoState> {
  const validatedFields = EstadoSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos inválidos",
    };
  }

  try {
    await db.estado.update({
      where: {
        id,
      },
      data: {
        name: validatedFields.data.name,
      },
    });
  } catch (error) {
    return {
      message: "Error al actualizar el estado",
    };
  }

  revalidatePath("/catalogos/estados");
  redirect("/catalogos/estados");
}

export async function deleteEstado(
  id: string,
  prevState: EstadoState
): Promise<EstadoState> {
  try {
    await db.estado.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return {
      message: "Error al eliminar el estado",
    };
  }

  revalidatePath("/catalogos/estados");
  redirect("/catalogos/estados");
}
