import { GroupPageClient } from "@/components/tasks/group-page-client";
import { getGroup } from "@/lib/actions/groups";
import { getServerSession } from "@/lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const _params = await params;
  const group = await getGroup(_params.id.split("__")[1]);

  return {
    title: group
      ? `${group.name} - Zoho lite`
      : "Grupo no encontrado - Zoho lite",
    description: group?.description || "Detalles del grupo",
  };
}

export default async function GroupPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/login");
  }

  const _params = await params;

  const group = await getGroup(_params.id.split("__")[1]);

  if (!group) {
    redirect("/groups");
  }

  return <GroupPageClient group={group} />;
}
