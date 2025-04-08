"use server";
import { Proyecto, ProyectoState } from "@/@types";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ProyectoSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre es requerido",
  }),
});

export type State = ProyectoState;

export async function getAllProyectos(): Promise<Proyecto[]> {
  return await db.proyecto.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getProyectoById(id: string) {
  return await db.proyecto.findUnique({
    where: { id },
  });
}

export async function createProyecto(formData: FormData) {
  const validatedFields = ProyectoSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos inválidos. No se pudo crear el proyecto.",
    };
  }

  try {
    await db.proyecto.create({
      data: {
        name: validatedFields.data.name,
      },
    });
  } catch (error) {
    return {
      message: "Error de base de datos: No se pudo crear el proyecto.",
    };
  }

  revalidatePath("/catalogos/proyectos");
  redirect("/catalogos/proyectos");
}

export async function updateProyecto(
  id: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = ProyectoSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos inválidos. No se pudo actualizar el proyecto.",
    };
  }

  try {
    await db.proyecto.update({
      where: { id },
      data: {
        name: validatedFields.data.name,
      },
    });
  } catch (error) {
    return {
      message: "Error de base de datos: No se pudo actualizar el proyecto.",
    };
  }

  revalidatePath("/catalogos/proyectos");
  redirect("/catalogos/proyectos");
}

export async function deleteProyecto(formData: FormData) {
  const id = formData.get("id") as string;

  try {
    await db.proyecto.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);
    return {
      message:
        "Error al eliminar el proyecto. Por favor, verifica que el proyecto existe y que no está asociado a otras entidades.",
      errors: {
        general: [error instanceof Error ? error.message : "Error desconocido"],
      },
    };
  }
  revalidatePath("/catalogos/proyectos");
  redirect("/catalogos/proyectos");
}
