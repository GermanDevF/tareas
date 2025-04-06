"use client";

import { CreateLiderDialogProps } from "@/@types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createLider } from "../actions";

const formSchema = z.object({
  userId: z.string().min(1, "El usuario es requerido"),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateLiderDialog({
  isOpen,
  onOpenChange,
  availableUsers,
}: CreateLiderDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
    },
  });

  const handleCreate = () => {
    router.replace("/catalogos/lideres?isCreateLiderModalOpen=true");
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.replace("/catalogos/lideres");
      form.reset();
    }
    onOpenChange(open);
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("userId", data.userId);
    await createLider(formData);
  };

  const selectedUser = availableUsers.find(
    (user) => user.id === form.watch("userId")
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={handleCreate}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Nuevo Líder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Líder</DialogTitle>
          <DialogDescription>Asigna un usuario como líder</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Usuario</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}>
                          {field.value ? (
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                {selectedUser?.image && (
                                  <AvatarImage
                                    src={selectedUser.image}
                                    alt="Avatar"
                                  />
                                )}
                                <AvatarFallback>
                                  {selectedUser?.name?.charAt(0) || "U"}
                                </AvatarFallback>
                              </Avatar>
                              {selectedUser?.name || "Usuario desconocido"}
                            </div>
                          ) : (
                            "Selecciona un usuario"
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Buscar usuario..." />
                        <CommandEmpty>No se encontraron usuarios.</CommandEmpty>
                        <CommandGroup>
                          {availableUsers.map((user) => (
                            <CommandItem
                              key={user.id}
                              value={user.name || user.email}
                              onSelect={() => {
                                form.setValue("userId", user.id);
                                setOpen(false);
                              }}>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  {user.image && (
                                    <AvatarImage
                                      src={user.image}
                                      alt="Avatar"
                                    />
                                  )}
                                  <AvatarFallback>
                                    {user.name?.charAt(0) || "U"}
                                  </AvatarFallback>
                                </Avatar>
                                {user.name || user.email}
                              </div>
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  field.value === user.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Crear Líder</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
