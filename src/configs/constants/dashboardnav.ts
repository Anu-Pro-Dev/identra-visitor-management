import { Badge, Building2, CalendarCheck2, FileTextIcon, Grid2x2Plus, LayoutDashboard, Shapes, UserPlus2, Users2Icon } from "lucide-react";

const getRoleBasedNavigation = (role: string) => {
  switch (role.toLowerCase()) {
    case "host":
      return {
        navMain: [
          {
            title: "Dashboard",
            url: "/dashboard",
            icon: Grid2x2Plus,
          },
          {
            title: "Approvals",
            url: "/dashboard/approvals",
            icon: CalendarCheck2,
          },
          {
            title: "Visitors list",
            url: "/dashboard/visitors",
            icon: Users2Icon,
          },
          {
            title: "Reports",
            url: "/dashboard/reports",
            icon: FileTextIcon,
          },
        ],
        secondaryNav: [],
      };

    case "security":
      return {
        navMain: [
          {
            title: "Dashboard",
            url: "/dashboard",
            icon: Grid2x2Plus,
          },
          {
            title: "Approvals",
            url: "/dashboard/approvals",
            icon: CalendarCheck2,
          },
          {
            title: "Register user",
            url: "/register",
            icon: UserPlus2,
          },
          {
            title: "Reports",
            url: "/dashboard/reports",
            icon: FileTextIcon,
          },
        ],
        secondaryNav: [],
      };

    case "admin":
    case "administrator":
      return {
        navMain: [
          {
            title: "Dashboard",
            url: "/dashboard",
            icon: Grid2x2Plus,
          },
          {
            title: "Register user",
            url: "/register",
            icon: UserPlus2,
          },
          {
            title: "Approvals",
            url: "/dashboard/approvals",
            icon: CalendarCheck2,
          },
        ],
        secondaryNav: [
          {
            title: "Company",
            url: "/dashboard/company",
            icon: Building2,
          },
          {
            title: "Roles",
            url: "/dashboard/role",
            icon: Shapes,
          },
          {
            title: "Badges",
            url: "/dashboard/badges",
            icon: Badge,
          },
          {
            title: "Reports",
            url: "/dashboard/reports",
            icon: FileTextIcon,
          },
        ],
      };

    default:
      // Fallback for unknown roles
      return {
        navMain: [
          {
            title: "Dashboard",
            url: "/dashboard",
            icon: Grid2x2Plus,
          },
        ],
        secondaryNav: [],
      };
  }
};

export { getRoleBasedNavigation };
