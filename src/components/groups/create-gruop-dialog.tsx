"use client";

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
}

export function CreateGroupDialog({
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
        <GroupForm />
      </DialogContent>
    </Dialog>
  );
}
