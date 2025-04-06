export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface FormState {
  message: string;
  errors?: {
    [key: string]: string[] | undefined;
  };
}
