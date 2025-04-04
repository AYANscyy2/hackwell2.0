"use client";
import React from "react";
import { SidebarProvider } from "src/components/ui/sidebar";
import DashboardSidebar from "src/components/admin/Dasboard/Sidebar";
import DashboardContent from "src/components/admin/Dasboard/DashboardContent";
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
