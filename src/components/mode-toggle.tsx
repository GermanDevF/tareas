"use client";

import { useCallback } from "react";
import { Moon, MoonIcon, Sun, Terminal } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  // Memoiza las funciones para evitar recreaciones innecesarias
  const handleThemeChange = useCallback(
    (mode: string) => setTheme(mode),
    [setTheme]
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
        <DropdownMenuItem
          className={theme === "light" ? "bg-muted" : ""}
          onClick={() => handleThemeChange("light")}>
          <Sun /> Claro
        </DropdownMenuItem>
        <DropdownMenuItem
          className={theme === "dark" ? "bg-muted" : ""}
          onClick={() => handleThemeChange("dark")}>
          <MoonIcon /> Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem
          className={theme === "system" ? "bg-muted" : ""}
          onClick={() => handleThemeChange("system")}>
          <Terminal /> Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
