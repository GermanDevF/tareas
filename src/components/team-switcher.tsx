"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Icon from "./get-icon"; // Importa el componente Icon

interface GroupWithIcon {
  id: string;
  name: string;
  icon: string;
}

export function TeamSwitcher() {
  const [teams, setTeams] = React.useState<GroupWithIcon[]>([]);
  const [activeTeam, setActiveTeam] = React.useState<GroupWithIcon | null>(
    null
  );

  React.useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await fetch("/api/groups");
        const groups = await response.json();
        setTeams(groups);
        if (groups.length > 0) {
          setActiveTeam(groups[0]);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    }
    fetchGroups();
  }, []);

  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                {activeTeam ? (
                  <Icon
                    iconName={activeTeam?.icon || "Users"}
                    className="size-4"
                  />
                ) : (
                  <div className="size-4 rounded-md border bg-transparent" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeTeam ? activeTeam.name : "Select team"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}>
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Grupos
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <Icon iconName={team?.icon || "Users"} className="size-4" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">
                Crear nuevo grupo
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
