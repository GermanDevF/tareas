export interface Ambiente {
  id: string;
  name: string;
}

export interface AmbienteState {
  message: string;
  errors: {
    name?: string[];
  };
}

export interface CreateAmbienteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface DeleteAmbienteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ambienteId?: string;
}

export interface EditAmbienteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ambiente: Ambiente;
}
