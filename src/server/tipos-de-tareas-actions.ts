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

  if (!validatedFields.success) {
    return { error: "Campos no válidos" };
  }

  try {
    await db.tipoDeTarea.create({ data: validatedFields.data });
    revalidatePath("/catalogos/tipos-de-tarea");
    return { success: "Tipo de tarea creado" };
  } catch (error) {
    return { error: "Error al crear el tipo de tarea" };
  }
}

export async function updateTipoDeTarea(
  id: string,
  values: z.infer<typeof tipoDeTareaSchema>
) {
  const validatedFields = tipoDeTareaSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos no válidos" };
  }

  try {
    await db.tipoDeTarea.update({ where: { id }, data: validatedFields.data });
    revalidatePath("/catalogos/tipos-de-tarea");
    return { success: "Tipo de tarea actualizado" };
  } catch (error) {
    return { error: "Error al actualizar el tipo de tarea" };
  }
}

export async function deleteTipoDeTarea(id: string) {
  try {
    await db.tipoDeTarea.delete({ where: { id } });
    revalidatePath("/catalogos/tipos-de-tarea");
    return { success: "Tipo de tarea eliminado" };
  } catch (error) {
    return { error: "Error al eliminar el tipo de tarea" };
  }
}

export async function getAllTipoDeTarea() {
  try {
    const tiposDeTarea = await db.tipoDeTarea.findMany();
    return tiposDeTarea;
  } catch (error) {
    return [];
  }
}
