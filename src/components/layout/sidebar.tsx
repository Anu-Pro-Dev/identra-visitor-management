"use client";
import * as React from "react";
import { NavMain } from "./nav";
import { NavSecondary } from "./secondaryNav";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { getRoleBasedNavigation } from "@/configs/constants/dashboardnav";
import { userRoles } from "@/configs/constants/roles";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { LogoIcon } from "../common/svg/icons";
import { Button } from "../ui/button";
import { IconUser, IconLogout } from "@tabler/icons-react";

export function AppSidebar(
  props: React.ComponentProps<typeof Sidebar> & {
    role: (typeof userRoles)[number];
  }
) {
  const { role, ...sidebarProps } = props;
  const data = getRoleBasedNavigation(role);
  
  return (
    <Sidebar collapsible="offcanvas" className="" {...sidebarProps}>
      <SidebarHeader className="border-b border-border/50 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              className="flex items-center gap-3 p-3 text-sm font-medium h-full rounded-lg hover:bg-sidebar-accent transition-colors duration-200"
              href={"/dashboard"}
            >
              <div className="flex items-center justify-center">
                <LogoIcon />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold text-sidebar-foreground">
                  Identra
                </span>
                <span className="text-xs text-sidebar-foreground/60">
                  Visitor Management
                </span>
              </div>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4">
        <NavMain items={data.navMain} />
        <div className="my-4">
          <Separator className="bg-border/50" />
        </div>
        <NavSecondary items={data.secondaryNav} />
      </SidebarContent>
      
      <SidebarFooter className="border-t border-border/50 p-4">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent/50">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <IconUser className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              Admin User
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              admin@identra.com
            </p>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <IconLogout className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
