import {
  BrainCircuit,
  Crown,
  ListChecks,
  MapPin,
  PanelsTopLeft,
  TentTree,
} from "lucide-react";
import Link from "next/link";

const catalogItems = [
  {
    href: "/catalogos/tipos-de-tarea",
    icon: ListChecks,
    label: "Tipos de Tarea",
    description: "Gestiona los diferentes tipos de tareas para tus proyectos",
  },
  {
    href: "/catalogos/lideres",
    icon: Crown,
    label: "Líderes",
    description: "Administra los líderes de equipos y proyectos",
  },
  {
    href: "/catalogos/proyectos",
    icon: PanelsTopLeft,
    label: "Proyectos",
    description: "Gestiona los proyectos de tu organización",
  },
  {
    href: "/catalogos/ambientes",
    icon: TentTree,
    label: "Ambientes",
    description: "Gestiona los ambientes de tu organización",
  },
  {
    href: "/catalogos/estados",
    icon: MapPin,
    label: "Estados",
    description: "Gestiona los estados de tus proyectos",
  },
  {
    href: "/catalogos/programadores",
    icon: BrainCircuit,
    label: "Desarrolladores",
    description: "Gestiona los desarrolladores de tu organización",
  },
];

const Page = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Catálogos del Sistema</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Gestiona y administra todos los catálogos de tu aplicación desde un
          solo lugar. Selecciona una categoría para comenzar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {catalogItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col items-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:scale-[1.02]">
              <div className="mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Icon className="size-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">{item.label}</h2>
              <p className="text-sm text-muted-foreground text-center">
                {item.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
