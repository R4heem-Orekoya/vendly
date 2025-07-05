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
            <main>
               <header className="flex items-center justify-between w-full h-12 px-2 border-b">
                  <SidebarTrigger />
               </header>
               <div className="p-4">
                  {children}
               </div>
            </main>
         </SidebarInset>
      </SidebarProvider>
   )
}
