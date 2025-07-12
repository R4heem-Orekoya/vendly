"use client";

import { dashboardLinks } from "@/lib/consts";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardSidebarContent() {
  const pathname = usePathname();

  return (
    <SidebarContent className="mt-4 gap-6 px-4 md:px-2">
      {dashboardLinks.map((item) => (
        <SidebarGroup key={item.label}>
          <SidebarGroupLabel>{item.label}</SidebarGroupLabel>
          <SidebarMenu>
            {item.items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className="text-muted-foreground data-[active=true]:bg-primary data-[active=true]:text-background cursor-pointer font-medium"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}
