"use client";
import React from "react";
import { SidebarProvider } from "~/components/ui/sidebar";
import DashboardSidebar from "~/components/Dasboard/admin/Sidebar";
import DashboardContent from "~/components/Dasboard/admin/DashboardContent";
import { useSearchParams } from "next/navigation";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const userType = searchParams.get("type") ?? "null";
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar type={userType} />
        <DashboardContent type={userType} />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
