import { LucideIcon } from "lucide-react";
import { DefaultSession } from "next-auth";
import { User } from "@prisma/client";

declare module "next-auth" {
  /**
   * Extends the built-in session types to include user properties.
   */
  interface Session {
    accessToken: string;
    user: DefaultSession["user"] & {
      id: string;
      name: string;
      email: string;
      image?: string | null;
    } & Omit<User, "password" | "createdAt" | "updatedAt">;
  }
}

/**
 * Interface representing a group.
 */
export interface Group {
  id: string;
  name: string;
  icon: LucideIcon; // Asegurarse de que LucideIcon sea un componente React
  plan: string; // Puedes tipar plan con un enum o una unión de strings si es necesario
}
