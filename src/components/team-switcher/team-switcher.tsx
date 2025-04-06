"use client";

import { Group } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { getGroups } from "@/client/groups";
import { CreateGroupDialog } from "@/components/groups/create-gruop-dialog";
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
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { TeamButton } from "./team-button";
import { TeamItem } from "./team-item";

type NewGroup = Omit<Group, "createdAt" | "updatedAt" | "ownerId">;

export function TeamSwitcher() {
  const { data: teams = [] } = useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: getGroups,
    placeholderData: [],
  });

  const { data: session } = useSession();
  const { isMobile } = useSidebar();

  const [isCreateGroupDialogOpen, setIsCreateGroupDialogOpen] = useState(false);
  const [activeTeam, setActiveTeam] = useState<Group | null>(null);
  const [groupToEdit, setGroupToEdit] = useState<Group | null>(null);

  useEffect(() => {
    if (teams.length > 0 && !activeTeam) {
      setActiveTeam(teams[0]);
    }
  }, [teams, activeTeam]);

  const handleCreateGroup = () => {
    setGroupToEdit(null);
    setIsCreateGroupDialogOpen(true);
  };

  const handleEditGroup = (team: Group) => {
    setGroupToEdit(team);
    setIsCreateGroupDialogOpen(true);
  };

  const handleGroupCreated = (newGroup: NewGroup) => {
    setActiveTeam(newGroup as Group);
    setIsCreateGroupDialogOpen(false);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <TeamButton activeTeam={activeTeam} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}>
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Grupos
            </DropdownMenuLabel>

            {teams.map((team) => (
              <TeamItem
                key={team.id}
                team={team}
                isOwner={team.ownerId === session?.user.id}
                onSelect={setActiveTeam}
                onEdit={handleEditGroup}
              />
            ))}

            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" onClick={handleCreateGroup}>
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
          group={groupToEdit}
          callback={handleGroupCreated}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
