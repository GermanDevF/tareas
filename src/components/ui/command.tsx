"use client";

import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";
import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface CommandProps extends React.ComponentProps<typeof CommandPrimitive> {}

function Command({ className, ...props }: CommandProps) {
  const commandClasses = cn(
    "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
    className
  );

  return (
    <CommandPrimitive
      data-slot="command"
      className={commandClasses}
      {...props}
    />
  );
}

interface CommandDialogProps extends React.ComponentProps<typeof Dialog> {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  ...props
}: CommandDialogProps) {
  const dialogContentClasses = "overflow-hidden p-0";
  const commandClasses =
    "[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5";

  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className={dialogContentClasses}>
        <Command className={commandClasses}>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}

interface CommandInputProps
  extends React.ComponentProps<typeof CommandPrimitive.Input> {}

function CommandInput({ className, ...props }: CommandInputProps) {
  const inputWrapperClasses = "flex h-9 items-center gap-2 border-b px-3";
  const inputClasses = cn(
    "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
    className
  );

  return (
    <div data-slot="command-input-wrapper" className={inputWrapperClasses}>
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={inputClasses}
        {...props}
      />
    </div>
  );
}

interface CommandListProps
  extends React.ComponentProps<typeof CommandPrimitive.List> {}

function CommandList({ className, ...props }: CommandListProps) {
  const listClasses = cn(
    "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
    className
  );

  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={listClasses}
      {...props}
    />
  );
}

interface CommandEmptyProps
  extends React.ComponentProps<typeof CommandPrimitive.Empty> {}

function CommandEmpty({ ...props }: CommandEmptyProps) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  );
}

interface CommandGroupProps
  extends React.ComponentProps<typeof CommandPrimitive.Group> {}

function CommandGroup({ className, ...props }: CommandGroupProps) {
  const groupClasses = cn(
    "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
    className
  );

  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={groupClasses}
      {...props}
    />
  );
}

interface CommandSeparatorProps
  extends React.ComponentProps<typeof CommandPrimitive.Separator> {}

function CommandSeparator({ className, ...props }: CommandSeparatorProps) {
  const separatorClasses = cn("bg-border -mx-1 h-px", className);

  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={separatorClasses}
      {...props}
    />
  );
}

interface CommandItemProps
  extends React.ComponentProps<typeof CommandPrimitive.Item> {}

function CommandItem({ className, ...props }: CommandItemProps) {
  const itemClasses = cn(
    "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    className
  );

  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={itemClasses}
      {...props}
    />
  );
}

interface CommandShortcutProps extends React.ComponentProps<"span"> {}

function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  const shortcutClasses = cn(
    "text-muted-foreground ml-auto text-xs tracking-widest",
    className
  );

  return (
    <span data-slot="command-shortcut" className={shortcutClasses} {...props} />
  );
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
