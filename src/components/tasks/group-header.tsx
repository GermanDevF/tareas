import { Button } from "@/components/ui/button";
import { ClipboardList, Plus } from "lucide-react";
import Link from "next/link";

interface GroupHeaderProps {
  id: string;
  name: string;
  description: string | null;
}

export function GroupHeader({ id, name, description }: GroupHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">{name}</h1>
        {description && (
          <p className="text-muted-foreground mt-2">{description}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button asChild>
          <Link href={`/groups/${name}__${id}/tasks/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Tarea
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/groups/${name}__${id}/tasks`}>
            <ClipboardList className="mr-2 h-4 w-4" />
            Ver Tareas
          </Link>
        </Button>
      </div>
    </div>
  );
}
