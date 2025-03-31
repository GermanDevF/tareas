"use client";

import { ChevronsUpDown, Edit, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { getGroups } from "@/client/groups";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Group } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Icon from "./get-icon";
import { CreateGroupDialog } from "./groups/create-gruop-dialog";
import { Button } from "./ui";

export function TeamSwitcher() {
  const { data: teams = [] } = useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: getGroups,
    placeholderData: [],
  });

  const { data: session } = useSession();

  const [isCreateGroupDialogOpen, setIsCreateGroupDialogOpen] = useState(false);

  const [activeTeam, setActiveTeam] = useState<Group | null>(null);

  const [groupToEdit, setGroupToEdit] = useState<Group | null>(null);

  const { isMobile } = useSidebar();

  useEffect(() => {
    if (teams.length > 0 && !activeTeam) {
      setActiveTeam(teams[0]);
    }
  }, [teams, activeTeam]);

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
                {team.ownerId === session?.user.id && (
                  <Button
                    variant="ghost"
                    className="ml-auto rounded-full text-muted-foreground hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      setGroupToEdit(team);
                      setIsCreateGroupDialogOpen(true);
                    }}>
                    <Edit className="ml-auto size-4 text-muted-foreground" />
                  </Button>
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => {
                setGroupToEdit(null);
                setIsCreateGroupDialogOpen(true);
              }}>
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">
                Crear nuevo grupo
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CreateGroupDialog
          open={isCreateGroupDialogOpen}
          onOpenChange={setIsCreateGroupDialogOpen}
          group={groupToEdit} // Pasar grupo a editar
          callback={(newGroup) => {
            setActiveTeam(newGroup as Group);
            setIsCreateGroupDialogOpen(false);
          }}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
