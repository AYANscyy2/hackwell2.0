import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "~/components/ui/sidebar";
import { LayoutGrid, Users, BarChart2, Settings } from "lucide-react";
import Link from "next/link";

const DashboardSidebar = ({ type }: { type: string }) => {
  return (
    <Sidebar className="bg-slate-800 text-black">
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={true} tooltip="Dashboard">
              <Link href="/dashboard" className="text-black">
                <LayoutGrid />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="User Management">
              <Link href="#" className="text-black">
                <Users />
                <span>User Management</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="AI Task Matching">
              <Link
                href={`/dashboard/tasks?type=${type}`}
                className="text-black"
              >
                <BarChart2 />
                <span>AI Task Matching</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="#" className="text-black">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
