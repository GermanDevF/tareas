"use server";

import { AmbienteState } from "@/@types";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const AmbienteSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre es requerido",
  }),
});

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function getAllAmbientes() {
  return await db.ambiente.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getAmbienteById(id: string) {
  return await db.ambiente.findUnique({
    where: { id },
  });
}

export async function createAmbiente(
  prevState: AmbienteState,
  formData: FormData
): Promise<AmbienteState> {
  const name = formData.get("name");

  if (!name || typeof name !== "string") {
    return {
      message: "El nombre es requerido",
      errors: {
        name: ["El nombre es requerido"],
      },
    };
  }

  try {
    await db.ambiente.create({
      data: {
        name,
      },
    });

    return { message: "", errors: {} };
  } catch (error) {
    return {
      message: "Ocurrió un error al crear el ambiente",
      errors: {},
    };
  } finally {
    revalidatePath("/catalogos/ambientes");
  }
}

export async function updateAmbiente(
  id: string,
  prevState: AmbienteState,
  formData: FormData
): Promise<AmbienteState> {
  const name = formData.get("name");

  if (!name || typeof name !== "string") {
    return {
      message: "El nombre es requerido",
      errors: {
        name: ["El nombre es requerido"],
      },
    };
  }

  try {
    await db.ambiente.update({
      where: { id },
      data: {
        name,
      },
    });

    return { message: "", errors: {} };
  } catch (error) {
    return {
      message: "Ocurrió un error al actualizar el ambiente",
      errors: {},
    };
  } finally {
    revalidatePath("/catalogos/ambientes");
  }
}

export async function deleteAmbiente(
  id: string,
  prevState: AmbienteState
): Promise<AmbienteState> {
  if (!id) {
    return {
      message: "El ID del ambiente es requerido",
      errors: {},
    };
  }

  try {
    await db.ambiente.delete({
      where: { id },
    });

    return { message: "", errors: {} };
  } catch (error) {
    return {
      message: "Ocurrió un error al eliminar el ambiente",
      errors: {},
    };
  } finally {
    revalidatePath("/catalogos/ambientes");
  }
}
