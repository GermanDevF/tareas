"use server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const tipoDeTareaSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
});

export async function createTipoDeTarea(
  values: z.infer<typeof tipoDeTareaSchema>
) {
  const validatedFields = tipoDeTareaSchema.safeParse(values);
  let output = {
    success: "Tipo de tarea creado",
    message: "",
    errors: {},
  };

  if (!validatedFields.success) {
    output.message = "Campos no válidos";
    output.errors = validatedFields.error.flatten().fieldErrors;
    return output;
  }

  try {
    await db.tipoDeTarea.create({ data: validatedFields.data });
    output.success = "Tipo de tarea creado";
  } catch (error) {
    output.message = "Error al crear el tipo de tarea";
    output.errors = {
      general: [error instanceof Error ? error.message : "Error desconocido"],
    };
  }

  revalidatePath("/catalogos/tipos-de-tarea");
  return output;
}

export async function updateTipoDeTarea(
  id: string,
  values: z.infer<typeof tipoDeTareaSchema>
) {
  let output = {
    success: "Tipo de tarea actualizado",
    message: "",
    errors: {},
  };
  const validatedFields = tipoDeTareaSchema.safeParse(values);

  if (!validatedFields.success) {
    output.message = "Campos no válidos";
    output.errors = validatedFields.error.flatten().fieldErrors;
    return output;
  }

  try {
    await db.tipoDeTarea.update({ where: { id }, data: validatedFields.data });
    revalidatePath("/catalogos/tipos-de-tarea");
    output.success = "Tipo de tarea actualizado";
  } catch (error) {
    output.message = "Error al actualizar el tipo de tarea";
    output.errors = {
      general: [error instanceof Error ? error.message : "Error desconocido"],
    };
  }

  revalidatePath("/catalogos/tipos-de-tarea");
  return output;
}

export async function deleteTipoDeTarea(id: string) {
  let output = {
    success: "Tipo de tarea eliminado",
    message: "",
    errors: {},
  };
  try {
    await db.tipoDeTarea.delete({ where: { id } });
    output.success = "Tipo de tarea eliminado";
  } catch (error) {
    console.error("Error al eliminar el tipo de tarea:", error);
    output = {
      success: "",
      message:
        "Error al eliminar el tipo de tarea. Por favor, verifica que el tipo de tarea existe y que no está asociado a otras entidades.",
      errors: {
        general: [error instanceof Error ? error.message : "Error desconocido"],
      },
    };
  }
  revalidatePath("/catalogos/tipos-de-tarea");
  return output;
}

export async function getAllTipoDeTarea() {
  try {
    const tiposDeTarea = await db.tipoDeTarea.findMany();
    return tiposDeTarea;
  } catch (error) {
    return [];
  }
}
