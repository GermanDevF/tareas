import { BaseDialogProps, BaseEntity, FormState } from "./common";

export interface Estado extends BaseEntity {
  name: string;
}

export interface EditEstadoDialogProps extends BaseDialogProps {
  estado: Estado;
}

export interface DeleteEstadoDialogProps extends BaseDialogProps {
  estadoId?: string;
}

export interface CreateEstadoDialogProps extends Omit<BaseDialogProps, "open"> {
  isOpen: boolean;
}

export type EstadoState = FormState;
