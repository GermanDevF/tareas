"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components"; // Asegúrate de que la ruta sea correcta

const SkeletonRow = () => (
  <TableRow>
    <TableCell className="py-2 px-4 border-b">
      <div className="h-4 bg-gray-300 rounded animate-pulse w-32" />
    </TableCell>
    <TableCell className="py-2 px-4 border-b">
      <div className="flex gap-2">
        <div className="h-8 w-16 bg-gray-300 rounded animate-pulse" />
        <div className="h-8 w-16 bg-gray-300 rounded animate-pulse" />
      </div>
    </TableCell>
  </TableRow>
);

const LoadingTiposDeTareas = () => {
  const skeletonRows = Array.from({ length: 5 }); // Número de filas skeleton

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="py-2 px-4 border-b">Nombre</TableHead>
            <TableHead className="py-2 px-4 border-b">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skeletonRows.map((_, index) => (
            <SkeletonRow key={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LoadingTiposDeTareas;
