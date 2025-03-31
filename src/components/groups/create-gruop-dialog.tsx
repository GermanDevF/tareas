"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Group } from "@prisma/client";
import { GroupForm } from "./group-form";

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  callback: (group: Omit<Group, "ownerId" | "createdAt" | "updatedAt">) => void;
  group?: Group | null;
}

export function CreateGroupDialog({
  callback,
  onOpenChange,
  open,
  group,
}: CreateGroupDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle>Crear nuevo grupo</DialogTitle>
          <DialogDescription>
            Ingrese los detalles del nuevo grupo.
          </DialogDescription>
        </DialogHeader>
        <GroupForm callback={callback} group={group} />
      </DialogContent>
    </Dialog>
  );
}
