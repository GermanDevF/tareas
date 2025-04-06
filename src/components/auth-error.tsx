"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileWarning } from "lucide-react";
import { useSearchParams } from "next/navigation";

const AuthError = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (!error) return null;

  const errorMessages: Record<string, { title: string; message: string }> = {
    OAuthAccountNotLinked: {
      title: "Cuenta no vinculada",
      message:
        "Este correo ya está vinculado a otra cuenta. Por favor, inicia sesión con el mismo proveedor que usaste anteriormente.",
    },
    CredentialsSignin: {
      title: "Credenciales incorrectas",
      message:
        "El correo electrónico o la contraseña son incorrectos. Por favor, verifica tus datos.",
    },
    OAuthSignin: {
      title: "Error de autenticación",
      message:
        "Ocurrió un error al intentar iniciar sesión con el proveedor seleccionado.",
    },
    OAuthCallback: {
      title: "Error de callback",
      message:
        "Ocurrió un error al procesar la respuesta del proveedor de autenticación.",
    },
    OAuthCreateAccount: {
      title: "Error al crear cuenta",
      message: "No se pudo crear una cuenta con el proveedor seleccionado.",
    },
    EmailCreateAccount: {
      title: "Error al crear cuenta",
      message:
        "No se pudo crear una cuenta con el correo electrónico proporcionado.",
    },
    Callback: {
      title: "Error de autenticación",
      message: "Ocurrió un error durante el proceso de autenticación.",
    },
    EmailSignin: {
      title: "Error de inicio de sesión",
      message:
        "Ocurrió un error al intentar iniciar sesión con correo electrónico.",
    },
    SessionRequired: {
      title: "Sesión requerida",
      message: "Por favor, inicia sesión para acceder a esta página.",
    },
    Default: {
      title: "Error de autenticación",
      message:
        "Ocurrió un error inesperado durante el proceso de inicio de sesión.",
    },
  };

  const errorInfo =
    errorMessages[error as keyof typeof errorMessages] || errorMessages.Default;

  return (
    <Alert variant="destructive" className="mb-4">
      <FileWarning className="h-4 w-4" />
      <AlertTitle>{errorInfo.title}</AlertTitle>
      <AlertDescription>{errorInfo.message}</AlertDescription>
    </Alert>
  );
};

export default AuthError;
