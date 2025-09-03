"use client";

import { AppSidebar } from "@/components/layout/sidebar";
import { SiteHeader } from "@/components/layout/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthClient } from "@/lib/auth/client";
import { PageLoader } from "@/components/common/PageLoader";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<"Admin" | "Host" | "Security">("Admin");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await AuthClient.getCurrentUser();
        if (!user) {
          router.push("/");
          return;
        }
        
        // Map role strings to expected types
        const roleMap: Record<string, "Admin" | "Host" | "Security"> = {
          admin: "Admin",
          administrator: "Admin", 
          host: "Host",
          security: "Security"
        };
        
        setUserRole(roleMap[user.role.toLowerCase()] || "Admin");
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <SidebarProvider className="h-screen flex bg-background overflow-hidden">
      <AppSidebar role={userRole} variant="inset" vocab="dashboard" />
      <SidebarInset className="flex flex-col flex-1 min-w-0 rounded-2xl overflow-hidden">
        <SiteHeader />
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 h-full min-h-0">
            <div className="px-6 py-4 min-h-full bg-background">{children}</div>
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayout;
