"use client";
import { useMemo } from "react";
import {
  Badge,
  Building2,
  CalendarCheck2,
  FileTextIcon,
  Grid2x2Plus,
  LayoutDashboard,
  Shapes,
  UserPlus2,
  Users2Icon,
  Tags,
  History,
} from "lucide-react";

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const useNavigation = (role: string = "admin") => {
  const navigationItems = useMemo((): NavItem[] => {
    const baseItems: NavItem[] = [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ];

    switch (role.toLowerCase()) {
      case "host":
        return [
          ...baseItems,
          {
            title: "Approvals",
            url: "/dashboard/approvals",
            icon: CalendarCheck2,
          },
          {
            title: "Visitors",
            url: "/dashboard/visitors",
            icon: Users2Icon,
          },
          {
            title: "Reports",
            url: "/dashboard/reports",
            icon: FileTextIcon,
          },
        ];

      case "security":
        return [
          ...baseItems,
          {
            title: "Approvals",
            url: "/dashboard/approvals",
            icon: CalendarCheck2,
          },
          {
            title: "Badges",
            url: "/dashboard/badges",
            icon: Badge,
          },
          {
            title: "Visitors",
            url: "/dashboard/visitors",
            icon: Users2Icon,
          },
        ];

      case "admin":
      default:
        return [
          ...baseItems,
          {
            title: "Approvals",
            url: "/dashboard/approvals",
            icon: CalendarCheck2,
          },
          {
            title: "Visitors",
            url: "/dashboard/visitors",
            icon: Users2Icon,
          },
          {
            title: "Badges",
            url: "/dashboard/badges",
            icon: Badge,
          },
          {
            title: "Categories",
            url: "/dashboard/categories",
            icon: Tags,
          },
          {
            title: "Company",
            url: "/dashboard/company",
            icon: Building2,
          },
          {
            title: "History",
            url: "/dashboard/history",
            icon: History,
          },
          {
            title: "Reports",
            url: "/dashboard/reports",
            icon: FileTextIcon,
          },
          {
            title: "Role",
            url: "/dashboard/role",
            icon: UserPlus2,
          },
        ];
    }
  }, [role]);

  return {
    navigationItems,
  };
};
