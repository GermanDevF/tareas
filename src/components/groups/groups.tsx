import { GroupCard, NoGroups } from "@/components/groups";
import { Group, Task } from "@prisma/client";

interface LocalGroup extends Group {
  tasks: Task[];
  owner: {
    name: string;
  };
  _count: {
    users: number;
    tasks: number;
  };
}

export const Groups = ({ groups }: { groups: LocalGroup[] }) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {groups.length > 0 &&
        groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            isLoading={false}
            owner={group.owner.name}
          />
        ))}
      {groups.length === 0 && <NoGroups />}
    </div>
  );
};
