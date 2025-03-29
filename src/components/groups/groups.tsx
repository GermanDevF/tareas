import { GroupCard, NoGroups } from "@/components/groups";
import { Group } from "@prisma/client";

export const Groups = ({ groups }: { groups: Group[] }) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {groups.length > 0 &&
        groups.map((group) => <GroupCard key={group.id} group={group} />)}
      {groups.length === 0 && <NoGroups />}
    </div>
  );
};
