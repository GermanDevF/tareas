"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lider, User } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import Link from "next/link";

interface LiderWithUser extends Lider {
  user: User;
}

interface LiderTableProps {
  lideres: LiderWithUser[];
}

export function LiderTable({ lideres }: LiderTableProps) {
  if (lideres.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No hay líderes registrados
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lideres.map((lider) => (
            <TableRow key={lider.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    {lider.user.image && (
                      <AvatarImage src={lider.user.image} alt="Avatar" />
                    )}
                    <AvatarFallback>
                      {lider.user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span>{lider.user.name}</span>
                </div>
              </TableCell>
              <TableCell>{lider.user.email}</TableCell>

              <TableCell>
                <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                  <Link
                    href={{
                      pathname: "/catalogos/lideres",
                      query: { deleteId: lider.id },
                    }}>
                    <TrashIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
