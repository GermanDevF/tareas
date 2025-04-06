"use client";

import { Estado } from "@/@types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

interface EstadoTableProps {
  estados: Estado[];
}

export function EstadoTable({ estados }: EstadoTableProps) {
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
          {estados.map((estado) => (
            <TableRow key={estado.id}>
              <TableCell>{estado.name}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link
                    href={`/catalogos/estados?editId=${estado.id}`}
                    className="h-8 w-8">
                    <EditIcon className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link
                    href={`/catalogos/estados?deleteId=${estado.id}`}
                    className="h-8 w-8">
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
