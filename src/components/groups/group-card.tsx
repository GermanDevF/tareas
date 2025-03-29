import {
  Button,
  Card,
  CardAction,
  CardDescription,
  CardHeader,
} from "@/components/ui";
import { Group } from "@prisma/client";
import Icon from "../get-icon";

export function GroupCard({ group }: { group: Group }) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 p-4 flex flex-col">
      <CardHeader className="flex items-center gap-3 w-full">
        <Icon
          iconName={group.icon || "Users"}
          className="size-8 sm:size-10 text-gray-500"
        />
        <h2 className="text-lg sm:text-xl font-semibold">{group.name}</h2>
      </CardHeader>
      <CardDescription className="line-clamp-2 text-sm sm:text-base">
        {group?.description || "Sin descripción"}
      </CardDescription>
      <CardAction className="flex flex-col gap-2 mt-4 w-full xl:flex-row">
        <Button className="w-full xl:w-1/2">
          <Icon iconName="Plus" className="size-4 mr-2" />
          Agregar Tarea
        </Button>
        <Button className="w-full xl:w-1/2" variant="secondary">
          <Icon iconName="Users" className="size-4 mr-2" />
          Agregar Miembros
        </Button>
      </CardAction>
    </Card>
  );
}
