import { AppSidebar } from "@/components/layout/sidebar";
import { SiteHeader } from "@/components/layout/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="h-screen">
      <AppSidebar role={"Admin"} variant="inset" vocab="dashboard" />
      <SidebarInset>
        <SiteHeader />
        <ScrollArea>
          <div className="px-6 py-4">{children}</div>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default layout;
