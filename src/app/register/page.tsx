import { RegisterForm } from "@/components/register-form";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Registrarse",
  description: "Crea una nueva cuenta",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RegisterPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  );
}
