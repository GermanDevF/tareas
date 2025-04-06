"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const TipoDeTareaSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre es requerido",
  }),
  description: z.string().optional(),
  color: z.string().min(1, {
    message: "El color es requerido",
  }),
});

export type State = {
  errors?: {
    name?: string[];
    description?: string[];
    color?: string[];
  };
  message?: string | null;
};

export type ActionState = {
  errors?: {
    name?: string[];
    description?: string[];
    color?: string[];
  };
  message: string;
};

export async function getAllTiposDeTarea() {
  return await db.tipoDeTarea.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getTipoDeTareaById(id: string) {
  return await db.tipoDeTarea.findUnique({
    where: { id },
  });
}

export async function createTipoDeTarea(
  state: ActionState,
  formData: FormData
): Promise<ActionState> {
  const validatedFields = TipoDeTareaSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    color: formData.get("color"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos inválidos. No se pudo crear el tipo de tarea.",
    };
  }

  try {
    await db.tipoDeTarea.create({
      data: {
        name: validatedFields.data.name,
        description: validatedFields.data.description || null,
        color: validatedFields.data.color,
      },
    });
  } catch (error) {
    return {
      message: "Error de base de datos: No se pudo crear el tipo de tarea.",
    };
  }

  revalidatePath("/catalogos/tipos-de-tarea");
  redirect("/catalogos/tipos-de-tarea");
}

export async function updateTipoDeTarea(
  id: string,
  state: ActionState,
  formData: FormData
): Promise<ActionState> {
  const validatedFields = TipoDeTareaSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    color: formData.get("color"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos inválidos. No se pudo actualizar el tipo de tarea.",
    };
  }

  try {
    await db.tipoDeTarea.update({
      where: { id },
      data: {
        name: validatedFields.data.name,
        description: validatedFields.data.description || null,
        color: validatedFields.data.color,
      },
    });
  } catch (error) {
    return {
      message:
        "Error de base de datos: No se pudo actualizar el tipo de tarea.",
    };
  }

  revalidatePath("/catalogos/tipos-de-tarea");
  redirect("/catalogos/tipos-de-tarea");
}

export async function deleteTipoDeTarea(
  state: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = formData.get("id") as string;

  try {
    await db.tipoDeTarea.delete({
      where: { id },
    });
  } catch (error) {
    return {
      message: "Error de base de datos: No se pudo eliminar el tipo de tarea.",
    };
  }

  revalidatePath("/catalogos/tipos-de-tarea");
  redirect("/catalogos/tipos-de-tarea");
}
