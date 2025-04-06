"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Proyecto } from "@prisma/client";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

interface ProjectTableProps {
  proyectos: Proyecto[];
}

export function ProjectTable({ proyectos }: ProjectTableProps) {
  if (proyectos.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No hay proyectos registrados
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proyectos.map((proyecto) => (
            <TableRow key={proyecto.id}>
              <TableCell>{proyecto.name}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                  <Link
                    href={{
                      pathname: "/catalogos/proyectos",
                      query: { editId: proyecto.id },
                    }}>
                    <PencilIcon className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                  <Link
                    href={{
                      pathname: "/catalogos/proyectos",
                      query: { deleteId: proyecto.id },
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
