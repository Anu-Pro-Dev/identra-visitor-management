import { AppSidebar } from "@/components/layout/sidebar";
import { SiteHeader } from "@/components/layout/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="h-screen flex bg-background overflow-hidden">
      <AppSidebar role={"Admin"} variant="inset" vocab="dashboard" />
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

export default layout;
