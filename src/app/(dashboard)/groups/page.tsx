"use client";
import { Groups } from "@/components/groups";
import { LoadingGroups } from "@/components/groups/loading-groups";
import { useGetMyGroups } from "@/hooks";

export default function GroupsPage() {
  const { groups = [], isLoading, isError } = useGetMyGroups();

  if (isLoading) {
    return <LoadingGroups />;
  }

  if (isError) {
    return <p className="text-red-500">Error al cargar los grupos.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mis Grupos</h1>
      <Groups groups={groups} />
    </div>
  );
}
