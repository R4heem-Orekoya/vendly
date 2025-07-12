import { Sidebar } from "@/components/ui/sidebar";
import DashboardSidebarHeader from "./sidebar-header";
import DashboardSidebarContent from "./sidebar-content";
import DashboardSidebarFooter from "./sidebar-footer";

export function DashboardSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <DashboardSidebarHeader />
      <DashboardSidebarContent />
      <DashboardSidebarFooter />
    </Sidebar>
  );
}
