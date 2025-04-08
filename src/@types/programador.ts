import { User } from "@prisma/client";
import { BaseDialogProps, BaseEntity, FormState } from "./common";

export interface Programador extends BaseEntity {
  userId: string;
  user: User;
}

export interface DeleteProgramadorDialogProps
  extends Omit<BaseDialogProps, "open"> {
  isOpen: boolean;
  programadorId?: string;
}

export interface CreateProgramadorDialogProps
  extends Omit<BaseDialogProps, "open"> {
  isOpen: boolean;
  availableUsers: User[];
}

export interface ProgramadorState extends FormState {
  errors?: {
    userId?: string[];
  };
}
