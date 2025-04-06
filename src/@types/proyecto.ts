import { BaseDialogProps, BaseEntity, FormState } from "./common";

export interface Proyecto extends BaseEntity {
  name: string;
}

export interface ProyectoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface EditProyectoDialogProps extends BaseDialogProps {
  proyecto: Proyecto;
}

export interface DeleteProyectoDialogProps extends BaseDialogProps {
  projectId?: string;
}

export interface CreateProyectoDialogProps extends BaseDialogProps {
  isOpen: boolean;
}

export type ProyectoState = FormState;
