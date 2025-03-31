import { ListChecks } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Catálogos</h1>
      <p className="text-gray-600 mb-8 text-center">
        Aquí puedes gestionar los diferentes catálogos de tu aplicación.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/catalogos/tipos-de-tarea"
          className="flex items-center justify-center p-6 rounded-lg shadow-md border transition-shadow hover:bg-accent hover:shadow-lg">
          <ListChecks className="mr-4 size-6" />
          <span className="text-lg font-semibold">Tipos de Tarea</span>
        </Link>
        {/* Agrega más enlaces aquí */}
      </div>
    </div>
  );
};

export default Page;
