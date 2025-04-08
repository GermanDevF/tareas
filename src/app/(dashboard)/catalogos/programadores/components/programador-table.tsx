"use client";

import { Programador } from "@/@types";
import { Button } from "@/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import Link from "next/link";

interface ProgramadorWithUser extends Programador {
  user: User;
}

interface ProgramadorTableProps {
  programadores: ProgramadorWithUser[];
  isLoading?: boolean;
  isError?: boolean;
}

function EmptyState() {
  return (
    <div className="text-center py-8 text-muted-foreground">
      No hay programadores registrados
    </div>
  );
}

function LoadingState() {
  return (
    <div className="text-center py-8 text-muted-foreground">
      Cargando programadores...
    </div>
  );
}

function ErrorState() {
  return (
    <div className="text-center py-8 text-destructive">
      Error al cargar los programadores
    </div>
  );
}

function ProgramadorRow({ programador }: { programador: ProgramadorWithUser }) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            {programador.user.image && (
              <AvatarImage src={programador.user.image} alt="Avatar" />
            )}
            <AvatarFallback>
              {programador.user.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <span>{programador.user.name}</span>
        </div>
      </TableCell>
      <TableCell>{programador.user.email}</TableCell>
      <TableCell>
        <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
          <Link
            href={{
              pathname: "/catalogos/programadores",
              query: { deleteId: programador.id },
            }}>
            <TrashIcon className="h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}

export function ProgramadorTable({
  programadores,
  isLoading = false,
  isError = false,
}: ProgramadorTableProps) {
  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!programadores.length) return <EmptyState />;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-24">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {programadores.map((programador) => (
            <ProgramadorRow key={programador.id} programador={programador} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
