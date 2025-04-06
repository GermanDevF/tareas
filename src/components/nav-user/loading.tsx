"use client";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function NavUserLoading() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <div className="grid flex-1 gap-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
