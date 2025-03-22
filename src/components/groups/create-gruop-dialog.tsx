"use client";

import { Group } from "@/@types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GroupForm } from "./gruop-form";

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  callback: (group: Group) => void;
}

export function CreateGroupDialog({
  callback,
  onOpenChange,
  open,
}: CreateGroupDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear nuevo grupo</DialogTitle>
          <DialogDescription>
            Ingrese los detalles del nuevo grupo.
          </DialogDescription>
        </DialogHeader>
        <GroupForm onCreate={callback} />
      </DialogContent>
    </Dialog>
  );
}
