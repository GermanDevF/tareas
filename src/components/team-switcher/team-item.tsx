"use client";

import Icon from "@/components/get-icon";
import { Button } from "@/components/ui";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Group } from "@prisma/client";
import { Edit } from "lucide-react";

interface TeamItemProps {
  team: Group;
  isOwner: boolean;
  onSelect: (team: Group) => void;
  onEdit: (team: Group) => void;
}

export function TeamItem({ team, isOwner, onSelect, onEdit }: TeamItemProps) {
  return (
    <DropdownMenuItem
      key={team.id}
      onClick={() => onSelect(team)}
      className="gap-2 p-2">
      <div className="flex size-6 items-center justify-center rounded-md border">
        <Icon iconName={team?.icon || "Users"} className="size-4" />
      </div>
      {team.name}
      {isOwner && (
        <Button
          variant="ghost"
          className="ml-auto rounded-full text-muted-foreground hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(team);
          }}>
          <Edit className="ml-auto size-4 text-muted-foreground" />
        </Button>
      )}
    </DropdownMenuItem>
  );
}
