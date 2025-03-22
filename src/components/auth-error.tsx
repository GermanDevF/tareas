"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const AuthError = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (!error) return null;

  const errorMessages: Record<string, string> = {
    OAuthAccountNotLinked:
      "Este correo ya está vinculado a otra cuenta. Inicia sesión con el mismo proveedor que usaste antes.",
    CredentialsSignin:
      "Credenciales incorrectas. Verifica tu correo y contraseña.",
    Default: "Ocurrió un error al iniciar sesión. Inténtalo de nuevo.",
  };

  const message =
    errorMessages[error as keyof typeof errorMessages] || errorMessages.Default;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Error de autenticación
        </h2>
        <p className="mt-2 text-gray-700">{message}</p>
        <div className="mt-4">
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Volver a intentar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthError;
