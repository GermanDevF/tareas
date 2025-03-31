"use client";

import { Bot, List, ListChecks, SquareTerminal } from "lucide-react";
import React, { Suspense } from "react";

import { NavProjects } from "@/components/nav-projects";
// import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
const NavUser = React.lazy(() =>
  import("@/components/nav-user").then((mod) => ({ default: mod.NavUser }))
);
const TeamSwitcher = React.lazy(() =>
  import("@/components/team-switcher").then((mod) => ({
    default: mod.TeamSwitcher,
  }))
);

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props} variant="inset">
      <SidebarHeader>
        <Suspense
          fallback={
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          }>
          <TeamSwitcher />
        </Suspense>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects items={routes} />
      </SidebarContent>
      <SidebarFooter>
        <React.Suspense
          fallback={
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          }>
          <NavUser
            user={{
              name: session?.user?.name ?? undefined,
              email: session?.user?.email ?? undefined,
              image: session?.user?.image ?? undefined,
            }}
          />
        </React.Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
