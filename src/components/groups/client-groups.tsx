"use client";
import { Group, Task } from "@prisma/client";
import { Groups } from "./groups";

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

interface ClientGroupsProps {
  groups: LocalGroup[];
}

export function ClientGroups({ groups }: ClientGroupsProps) {
  return <Groups groups={groups} />;
}
