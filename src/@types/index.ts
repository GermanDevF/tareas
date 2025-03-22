import { LucideIcon } from "lucide-react";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    } & DefaultSession["user"];
  }
}

export interface Group {
  id: string;
  name: string;
  logo: LucideIcon;
  plan: string;
}
