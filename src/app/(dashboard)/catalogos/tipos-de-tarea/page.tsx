"use client";
import { DialogCreateTipoDeTarea, TipoDeTareaTable } from "@/components";
import { getAllTipoDeTarea } from "@/server/tipos-de-tareas-actions";
import { TipoDeTarea } from "@prisma/client";
import { useEffect, useState } from "react";

const TiposDeTareaPage = () => {
  const [tiposDeTarea, setTiposDeTarea] = useState<TipoDeTarea[]>([]);

  useEffect(() => {
    const fetchTiposDeTarea = async () => {
      const data = await getAllTipoDeTarea();
      setTiposDeTarea(data);
    };

    fetchTiposDeTarea();
  }, []);

  const handleTipoDeTareaCreated = async () => {
    const data = await getAllTipoDeTarea();
    setTiposDeTarea(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tipos de Tarea</h1>
      <DialogCreateTipoDeTarea
        onTipoDeTareaCreated={handleTipoDeTareaCreated}
      />
      <TipoDeTareaTable
        tiposDeTarea={tiposDeTarea}
        onTipoDeTareaUpdated={handleTipoDeTareaCreated}
        onTipoDeTareaDeleted={handleTipoDeTareaCreated}
      />
    </div>
  );
};

export default TiposDeTareaPage;
