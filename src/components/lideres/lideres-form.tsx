"use client";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { useGetAllUsers } from "@/hooks/users/get-all-users";
import { cn } from "@/lib/utils";
import { createLider, updateLider } from "@/server/lideres-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lider, User } from "@prisma/client";
import {
  AlertCircle,
  Check,
  ChevronsUpDown,
  Loader2,
  Pencil,
  Plus,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const liderSchema = z.object({
  userId: z.string().min(1, { message: "El usuario es requerido" }),
});

type LiderFormValues = z.infer<typeof liderSchema>;

interface LiderFormProps {
  initialData?: Lider;
  onLiderCreated: () => void;
}

type LocalUser = Pick<User, "id" | "email" | "image" | "isAdmin" | "name">;

interface UserAdapted extends LocalUser {
  value: string;
  label: string;
}

const adapter = (users: LocalUser[]): UserAdapted[] =>
  users.map((user) => ({
    ...user,
    value: user.id,
    label: `${user?.name ? user.name : "Usuario sin nombre"} (${user.email})`,
  }));

export const DialogCreateLider = ({
  initialData,
  onLiderCreated,
}: LiderFormProps) => {
  const { data: session, status: sessionStatus } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    users: fetchedUsers = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
    refetch: refetchUsers,
  } = useGetAllUsers({ excludeLeaders: true });

  const usersAdapted = useMemo(() => adapter(fetchedUsers), [fetchedUsers]);

  const [open, setOpen] = useState(false);
  const form = useForm<LiderFormValues>({
    resolver: zodResolver(liderSchema),
    defaultValues: initialData
      ? { userId: initialData.userId }
      : { userId: "" },
  });

  const onSubmit = async (values: LiderFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const result = initialData
        ? await updateLider(initialData.id, values)
        : await createLider(values);

      if (result && result.success) {
        toast.success(result.success);
        form.reset();
        setOpen(false);
        onLiderCreated();
        await refetchUsers();
      } else if (result && result.error) {
        setErrorMessage(result.error);
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Ocurrió un error inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{initialData ? <Pencil /> : <Plus />}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          {initialData ? "Editar Líder" : "Crear Líder"}
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Selecciona un usuario</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}>
                          {field.value
                            ? usersAdapted.find(
                                (user) => user.value === field.value
                              )?.label || "Usuario no encontrado"
                            : "Selecciona un usuario"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Buscar usuario..." />
                        <CommandList>
                          <CommandEmpty>
                            No se encontraron usuarios.
                          </CommandEmpty>
                          <CommandGroup>
                            {usersAdapted.map((user) => (
                              <CommandItem
                                value={user.label}
                                key={user.value}
                                onSelect={() => {
                                  form.setValue("userId", user.value);
                                }}>
                                {user.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    user.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errorMessage && (
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle className="h-4 w-4" />
                {errorMessage}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="secondary" disabled={isSubmitting}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : initialData ? (
                  "Guardar Cambios"
                ) : (
                  "Crear"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
