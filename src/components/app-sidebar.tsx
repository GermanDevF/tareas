"use client";

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
import React, { Suspense, lazy } from "react";

import { NavProjects } from "@/components/nav-projects";
// import { TeamSwitcher } from "@/components/team-switcher";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

const NavUser = lazy(() =>
  import("@/components/nav-user").then((mod) => ({ default: mod.NavUser }))
);

const TeamSwitcher = lazy(() =>
  import("@/components/team-switcher").then((mod) => ({
    default: mod.TeamSwitcher,
  }))
);

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { data: session } = useSession();

  const routes = [
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
          url: "/catalogos/programadores",
          icon: BrainCircuit,
        },
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props} variant="inset">
      <SidebarHeader>
        <Suspense fallback={<LoadingSkeleton />}>
          <TeamSwitcher />
        </Suspense>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects items={routes} />
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<LoadingSkeleton />}>
          <NavUser />
        </Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
