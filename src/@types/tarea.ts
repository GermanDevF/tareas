import { BaseDialogProps, BaseEntity, FormState } from "./common";
import { Proyecto } from "./proyecto";
import { TipoTarea } from "./tipo-tarea";

export interface Tarea extends BaseEntity {
  name: string;
  description: string;
  status: TareaStatus;
  proyectoId: string;
  tipoTareaId: string;
  proyecto: Proyecto;
  tipoTarea: TipoTarea;
}

export enum TareaStatus {
  PENDIENTE = "PENDIENTE",
  EN_PROGRESO = "EN_PROGRESO",
  COMPLETADA = "COMPLETADA",
  CANCELADA = "CANCELADA",
}

export interface EditTareaDialogProps extends BaseDialogProps {
  tarea: Tarea;
}

export interface DeleteTareaDialogProps extends BaseDialogProps {
  tareaId?: string;
}

export interface CreateTareaDialogProps extends BaseDialogProps {
  isOpen: boolean;
}

export type TareaState = FormState;
