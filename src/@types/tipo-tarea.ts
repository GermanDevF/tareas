import { BaseDialogProps, BaseEntity, FormState } from "./common";

export interface TipoTarea extends BaseEntity {
  name: string;
  description: string;
}

export interface EditTipoTareaDialogProps extends BaseDialogProps {
  tipo: TipoTarea;
}

export interface DeleteTipoTareaDialogProps extends BaseDialogProps {
  tipoId?: string;
}

export interface CreateTipoTareaDialogProps extends BaseDialogProps {
  isOpen: boolean;
}

export type TipoTareaState = FormState;
