import { db } from "@/lib/prisma";
import { Ambiente, Estado, TipoDeTarea } from "@prisma/client";

const currentDate = new Date();

const tiposDeTarea: TipoDeTarea[] = [
  {
    id: "1",
    name: "Deffect",
    description: "Defecto",
    color: "#FF0000",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: "2",
    name: "Feature",
    description: "Feature",
    color: "#0000FF",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: "3",
    name: "Hotfix",
    description: "Hotfix",
    color: "#FFFF00",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: "4",
    name: "Refactor",
    description: "Refactor",
    color: "#00FF00",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
];

const ambientes: Ambiente[] = [
  {
    id: "1",
    name: "Desarrollo",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: "2",
    name: "Producción",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: "3",
    name: "No procede",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  { id: "4", name: "Pruebas", createdAt: currentDate, updatedAt: currentDate },
];

const estados: Estado[] = [
  { id: "1", name: "Oaxaca", createdAt: currentDate, updatedAt: currentDate },
  { id: "2", name: "Nayarit", createdAt: currentDate, updatedAt: currentDate },
];

export const seedTiposDeTarea = async () => {
  for (const item of tiposDeTarea) {
    await db.tipoDeTarea.create({ data: item });
  }
};

export const seedAmbientes = async () => {
  for (const item of ambientes) {
    await db.ambiente.create({ data: item });
  }
};

export const seedEstados = async () => {
  for (const item of estados) {
    await db.estado.create({ data: item });
  }
};
