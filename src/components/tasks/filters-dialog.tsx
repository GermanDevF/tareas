"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ListFilterPlus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../ui";

export interface FilterOption {
  value: string;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: "estado", label: "Estado" },
  { value: "type", label: "Tipo" },
  { value: "lideres", label: "Líder" },
  { value: "programador", label: "Programador" },
  { value: "proyecto", label: "Proyecto" },
];

interface FiltersDialogProps {
  selectedFilters: Set<string>;
  onFiltersChange: (filters: Set<string>) => void;
}

interface FilterFormValues {
  estado: string;
  type: string;
  lideres: string;
  programador: string;
  proyecto: string;
}

export const FiltersDialog = () => {
  const methods = useForm<FilterFormValues>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = (data: FilterFormValues) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`?${params.toString()}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="whitespace-nowrap">
          <ListFilterPlus className="h-4 w-4 mr-2" />
          Filtrar
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow z-50" />
        <DialogContent className="fixed top-[50%] left-[50%] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-lg border p-6 shadow-lg data-[state=open]:animate-contentShow z-50">
          <DialogTitle className="text-lg font-medium">
            Filtrar Tareas
          </DialogTitle>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-4 mt-4">
              {FILTER_OPTIONS.map(({ value, label }) => (
                <FormField
                  key={value}
                  name={value}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormLabel className="w-24">{label}</FormLabel>
                      <FormControl>
                        <Input
                          id={value}
                          {...methods.register(value as keyof FilterFormValues)}
                          className="border rounded p-2 w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit" variant="default" className="w-full">
                Aplicar Filtros
              </Button>
            </form>
          </FormProvider>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
