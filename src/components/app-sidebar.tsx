"use client";

import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";
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
  // This is sample data.
  const data = {
    navMain: [
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Dashboard",
        url: "/dashboard",
        icon: SquareTerminal,
      },
      {
        name: "Grupos",
        url: "/groups",
        icon: Bot, // Puedes cambiar el icono si quieres otro
      },
    ],
  };

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
        <NavProjects projects={data.projects} />
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
