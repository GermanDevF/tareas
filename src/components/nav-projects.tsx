"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface NavItem {
  name: string;
  url: string;
  icon?: LucideIcon;
  isActive: boolean;
  children?: {
    name: string;
    url: string;
    icon?: LucideIcon;
  }[];
}

interface NavProjectsProps {
  items: NavItem[];
}

function SubMenu({ items }: { items: NavItem["children"] }) {
  if (!items || items.length === 0) return null;

  return (
    <CollapsibleContent>
      <SidebarMenuSub>
        {items.map((subItem) => (
          <SidebarMenuSubItem key={subItem.name}>
            <SidebarMenuSubButton asChild>
              <Link href={subItem.url}>
                {subItem.icon && <subItem.icon />}
                <span>{subItem.name}</span>
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        ))}
      </SidebarMenuSub>
    </CollapsibleContent>
  );
}

export function NavProjects({ items }: NavProjectsProps) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.name}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible">
            <SidebarMenuItem>
              {item.children?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.name}>
                      {item.icon && <item.icon />}
                      <span>{item.name}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <SubMenu items={item.children} />
                </>
              ) : (
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="flex items-center">
                    {item.icon && <item.icon />}
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
