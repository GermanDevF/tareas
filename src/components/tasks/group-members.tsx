import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface GroupMember {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

interface GroupMembersProps {
  owner: GroupMember;
  members: {
    user: GroupMember;
  }[];
}

export function GroupMembers({ owner, members }: GroupMembersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Miembros del Grupo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Propietario */}
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <Avatar>
              <AvatarImage src={owner.image || undefined} />
              <AvatarFallback>{owner.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{owner.name}</p>
              <p className="text-sm text-muted-foreground">Propietario</p>
            </div>
          </div>

          {/* Miembros */}
          {members
            .filter((member) => member.user.id !== owner.id)
            .map((member) => {
              if (!member.user) return null;
              return (
                <div
                  key={member.user.id}
                  className="flex items-center gap-4 p-4 border rounded-lg">
                  <Avatar>
                    <AvatarImage src={member.user.image || undefined} />
                    <AvatarFallback>
                      {member.user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.user.email}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
}
