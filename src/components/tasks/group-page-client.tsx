"use client";

import Icon from "@/components/get-icon";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui";
import { ArrowUpDown, ListFilterPlus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface Group {
  id: string;
  name: string;
  icon: string;
  description: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: Task[];
  owner: Owner;
  users: User[];
}

export interface User {
  id: string;
  userId: string;
  groupId: string;
  createdAt: Date;
  user?: Owner;
}

export interface Owner {
  id: string;
  email: string;
  name: string;
  image: string;
  ownedGroups: OwnedGroup[];
  groups?: User[];
  tasks?: Task[];
}

export interface OwnedGroup {
  id: string;
  name: string;
  icon: string;
  description: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  content?: string;
  userId: string;
  groupId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface SortCriteria {
  column: keyof Task;
  direction: "asc" | "desc";
}

export const GroupPageClient = ({ group }: { group: Group }) => {
  const searchParams = useSearchParams();
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set(["bold", "italic", "strikethrough"])
  );
  const [open, setOpen] = useState<boolean>(false);
  const [sortCriteria, setSortCriteria] = useState<SortCriteria[]>([
    { column: "createdAt", direction: "asc" },
  ]); // Inicialmente ordenado por fecha de creación ascendente
  const [sortedTasks, setSortedTasks] = useState<Task[]>(group.tasks);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const filtersFromURL = new Set(params.get("filters")?.split(",") || []);
    setSelectedFilters(filtersFromURL);
  }, [searchParams]);

  useEffect(() => {
    sortTasks();
  }, [group.tasks, sortCriteria]);

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const updateFiltersInURL = (newFilters: Set<string>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newFilters.size > 0) {
      params.set("filters", Array.from(newFilters).join(","));
    } else {
      params.delete("filters");
    }
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const handleFilterChange = (value: string[]) => {
    const newSet = new Set(value);
    setSelectedFilters(newSet);
    updateFiltersInURL(newSet);
  };

  const sortTasks = () => {
    const sorted = [...group.tasks].sort((a, b) => {
      for (const criterion of sortCriteria) {
        let aValue = a[criterion.column];
        let bValue = b[criterion.column];

        if (typeof aValue === "string" && typeof bValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (!aValue || !bValue) return 0;

        if (aValue < bValue) {
          return criterion.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return criterion.direction === "asc" ? 1 : -1;
        }
      }
      return 0;
    });
    setSortedTasks(sorted);
  };

  const handleSort = (column: keyof Task) => {
    setSortCriteria((prevCriteria) => {
      const existingCriterion = prevCriteria.find(
        (criterion) => criterion.column === column
      );

      if (existingCriterion) {
        // Cambiar la dirección del criterio existente
        return prevCriteria.map((criterion) =>
          criterion.column === column
            ? {
                ...criterion,
                direction: criterion.direction === "asc" ? "desc" : "asc",
              }
            : criterion
        );
      } else {
        // Agregar un nuevo criterio al principio de la lista
        return [{ column, direction: "asc" }, ...prevCriteria];
      }
    });
  };

  return (
    <div className="p-6">
      <div className="w-full flex mb-4 items-center gap-4">
        <Icon iconName={group?.icon || "Users"} className="w-12 h-12 mb-4" />
        <h1 className="text-2xl font-bold mb-4">{group.name}</h1>
      </div>
      <p>{group.description}</p>

      {/* Filters */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <ListFilterPlus />
            <span className="ml-2">Filtrar tareas</span>
          </Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow z-50" />
          <DialogContent className="fixed top-[50%] left-[50%] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-lg border p-6 shadow-lg data-[state=open]:animate-contentShow z-50 ">
            <DialogTitle className="text-lg font-medium">Filtros</DialogTitle>
            <ToggleGroup
              type="multiple"
              value={Array.from(selectedFilters)}
              onValueChange={handleFilterChange}
              className="flex mt-4">
              <ToggleGroupItem value="name" aria-label="Toggle name">
                Nombre
              </ToggleGroupItem>
              <ToggleGroupItem
                value="description"
                aria-label="Toggle description">
                Descripción
              </ToggleGroupItem>
            </ToggleGroup>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      {group.tasks.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead scope="col" className="w-[1%]">
                <Checkbox
                  aria-label="Seleccionar todas las tareas"
                  checked={selectedTasks.size === group.tasks.length}
                  onCheckedChange={(checked) => {
                    setSelectedTasks(
                      checked
                        ? new Set(group.tasks.map((task) => task.id))
                        : new Set()
                    );
                  }}
                />
              </TableHead>
              <TableHead scope="col" onClick={() => handleSort("title")}>
                Nombre <ArrowUpDown className="inline-block" />
              </TableHead>
              <TableHead scope="col" onClick={() => handleSort("content")}>
                Descripción <ArrowUpDown className="inline-block" />
              </TableHead>
              <TableHead scope="col" onClick={() => handleSort("createdAt")}>
                Fecha de Creación <ArrowUpDown className="inline-block" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox
                    aria-label={`Seleccionar tarea: ${task.title}`}
                    checked={selectedTasks.has(task.id)}
                    onCheckedChange={() => toggleTaskSelection(task.id)}
                  />
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.content || "Sin descripción"}</TableCell>
                <TableCell>
                  {new Date(task.createdAt).toLocaleDateString("es-ES")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No hay tareas en este grupo.</p>
      )}

      {selectedTasks.size > 0 && (
        <p className="mt-4" aria-live="polite">
          Tareas seleccionadas: {selectedTasks.size}
        </p>
      )}
    </div>
  );
};
