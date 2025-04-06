"use server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const liderSchema = z.object({
  userId: z.string().min(1, { message: "El usuario es requerido" }),
});

export async function createLider(values: z.infer<typeof liderSchema>) {
  const validatedFields = liderSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos no válidos" };
  }

  try {
    await db.lider.create({ data: validatedFields.data });
    revalidatePath("/catalogos/lideres");
    return { success: "Líder creado" };
  } catch (error) {
    return { error: "Error al crear el líder" };
  }
}

export async function updateLider(
  id: string,
  values: z.infer<typeof liderSchema>
) {
  const validatedFields = liderSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos no válidos" };
  }

  try {
    await db.lider.update({ where: { id }, data: validatedFields.data });
    revalidatePath("/catalogos/lideres");
    return { success: "Líder actualizado" };
  } catch (error) {
    return { error: "Error al actualizar el líder" };
  }
}

export async function deleteLider(id: string) {
  try {
    await db.lider.delete({ where: { id } });
    revalidatePath("/catalogos/lideres");
    return { success: "Líder eliminado" };
  } catch (error) {
    return { error: "Error al eliminar el líder" };
  }
}

export async function getAllLideres() {
  try {
    const lideres = await db.lider.findMany({
      include: { user: true },
    });
    return lideres;
  } catch (error) {
    return [];
  }
}
