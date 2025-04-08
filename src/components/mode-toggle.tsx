"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, MoonIcon, Sun, Terminal } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";

interface ThemeOption {
  mode: string;
  label: string;
  icon: React.ComponentType;
}

const THEME_OPTIONS: ThemeOption[] = [
  { mode: "light", label: "Claro", icon: Sun },
  { mode: "dark", label: "Oscuro", icon: MoonIcon },
  { mode: "system", label: "Sistema", icon: Terminal },
];

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  // Memoiza las funciones para evitar recreaciones innecesarias
  const handleThemeChange = useCallback(
    (mode: string) => setTheme(mode),
    [setTheme]
  );

  const renderMenuItem = ({ mode, label, icon: Icon }: ThemeOption) => (
    <DropdownMenuItem
      key={mode}
      className={theme === mode ? "bg-muted" : ""}
      onClick={() => handleThemeChange(mode)}>
      <Icon /> {label}
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu>
      {/* Collapsed */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          className="mx-4">
          <Sun className="h-5 w-5 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>

      {/* Expanded */}
      <DropdownMenuContent align="end">
        {THEME_OPTIONS.map(renderMenuItem)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
