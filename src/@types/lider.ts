import { User } from "@prisma/client";
import { BaseDialogProps, BaseEntity, FormState } from "./common";

export interface Lider extends BaseEntity {
  userId: string;
  user: User;
}

export interface DeleteLiderDialogProps extends Omit<BaseDialogProps, "open"> {
  isOpen: boolean;
  liderId?: string;
}

export interface CreateLiderDialogProps extends Omit<BaseDialogProps, "open"> {
  isOpen: boolean;
  availableUsers: User[];
}

export type LiderState = FormState;
