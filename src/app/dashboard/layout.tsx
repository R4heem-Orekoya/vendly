import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { convex } from "@/lib/convex";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { api } from "~/convex/_generated/api";

interface DashboardLayoutProps {
   children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
   const store = await convex.query(api.stores.get)
   
   console.log(store);
   
   if(store === undefined) redirect("/store-setup")
   
   return (
      <>
         <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
               <main>{children}</main>
            </SidebarInset>
         </SidebarProvider>
      </>
   );
}
