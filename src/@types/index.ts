import { User } from "@prisma/client";
import { DefaultSession } from "next-auth";

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

export * from "./ambiente";
export * from "./common";
export * from "./estado";
export * from "./lider";
export * from "./programador";
export * from "./proyecto";
export * from "./tarea";
export * from "./tipo-tarea";
