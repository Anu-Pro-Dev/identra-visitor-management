"use client"

import * as React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: React.ElementType
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname()
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {(() => {
                const isActive =
                  pathname === item.url || pathname?.startsWith(`${item.url}/`)
                return (
                  <Link
                    className={`flex items-center gap-2 p-2 rounded-lg py-3 text-sm font-medium transition-colors ease-in-out duration-200 hover:bg-accent hover:text-primary ${
                      isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                    }`}
                    href={item.url}
                    title={item.title}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.icon && <item.icon size={16} />}
                    <span>{item.title}</span>
                  </Link>
                )
              })()}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
