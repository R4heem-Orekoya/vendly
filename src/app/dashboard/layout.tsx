import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import type { ReactNode } from "react"

interface DashboardLayoutProps {
   children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
   return (
      <SidebarProvider>
         <DashboardSidebar />
         <SidebarInset>
            <SidebarTrigger />
            <main className="p-4">{children}</main>
         </SidebarInset>
      </SidebarProvider>
   )
}
