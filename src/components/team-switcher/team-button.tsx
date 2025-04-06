"use client";

import Icon from "@/components/get-icon";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Group } from "@prisma/client";
import { ChevronsUpDown } from "lucide-react";

interface TeamButtonProps {
  activeTeam: Group | null;
}

export function TeamButton({ activeTeam }: TeamButtonProps) {
  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        {activeTeam ? (
          <Icon iconName={activeTeam?.icon || "Users"} className="size-4" />
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
  );
}
