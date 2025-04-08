import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession as getNextAuthServerSession } from "next-auth";

export async function getServerSession() {
  return await getNextAuthServerSession(authOptions);
}
