"use client"

import { dashboardLinks } from "@/lib/consts"
import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function DashboardSidebarContent() {
   const pathname = usePathname()

   return (
      <SidebarContent className="px-4 md:px-2 gap-6 mt-4">
         {dashboardLinks.map((item) => (
            <SidebarGroup key={item.label}>
               <SidebarGroupLabel>{item.label}</SidebarGroupLabel>
               <SidebarMenu>
                  {item.items.map((item) => (
                     <SidebarMenuItem key={item.title}>
                        <Link href={item.href}>
                           <SidebarMenuButton isActive={pathname === item.href} tooltip={item.title} className="text-muted-foreground font-medium cursor-pointer">
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
   )
}