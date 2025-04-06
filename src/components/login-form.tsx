"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import AuthError from "./auth-error";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        window.location.href = `/login?error=${result.error}`;
        return;
      }

      window.location.href = "/dashboard";
    } catch (error) {
      window.location.href = "/login?error=Default";
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthError />

      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="p-6 md:p-8 flex flex-col items-center text-center gap-6">
              <h1 className="text-2xl font-bold">Bienvenido de nuevo</h1>
              <p className="text-muted-foreground text-balance">
                Inicia sesión en tu cuenta de Acme Inc
              </p>

              <form onSubmit={handleEmailLogin} className="w-full space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
              </form>

              <div className="flex items-center gap-2 w-full">
                <Separator className="flex-1" />
                <span className="text-muted-foreground text-sm">O</span>
                <Separator className="flex-1" />
              </div>

              <Button
                variant="outline"
                type="button"
                className="w-full"
                disabled={isLoading}
                onClick={async () => {
                  try {
                    await signIn("google", {
                      redirect: false,
                    });
                  } catch (error) {
                    window.location.href = "/login?error=OAuthSignin";
                  }
                }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 mr-2">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Continuar con Google
              </Button>
            </div>
            <div className="bg-muted relative hidden md:block">
              <Image
                src="/bg.webp"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                width={500}
                height={500}
                priority
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
