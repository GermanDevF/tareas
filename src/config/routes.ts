import {
  Bot,
  BrainCircuit,
  Crown,
  List,
  ListChecks,
  MapPin,
  PanelsTopLeft,
  SquareTerminal,
  TentTree,
} from "lucide-react";

export const routes = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: SquareTerminal,
    isActive: true,
  },
  {
    name: "Grupos",
    url: "/groups",
    icon: Bot,
    isActive: false,
  },
  {
    name: "Catalogos",
    url: "/catalogos",
    icon: List,
    isActive: false,
    children: [
      {
        name: "Tipos de tarea",
        url: "/catalogos/tipos-de-tarea",
        icon: ListChecks,
      },
      {
        name: "Ambientes",
        url: "/catalogos/ambientes",
        icon: TentTree,
      },
      {
        name: "Estados",
        url: "/catalogos/estados",
        icon: MapPin,
      },
      {
        name: "Proyectos",
        url: "/catalogos/proyectos",
        icon: PanelsTopLeft,
      },
      {
        name: "Lideres",
        url: "/catalogos/lideres",
        icon: Crown,
      },
      {
        name: "Desarrolladores",
        url: "/catalogos/desarrolladores",
        icon: BrainCircuit,
      },
    ],
  },
];
