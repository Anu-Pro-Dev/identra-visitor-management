"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardView from "@/modules/dashboard/view/page";

export default function DashboardPageClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [accessibleRoutes, setAccessibleRoutes] = useState<string[]>([]);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <DashboardView
        user={{
          email: "admin@example.com",
          id: "123",
          name: "Admin User",
          permissions: [{ resource: "admin", action: "write" }],
          role: "admin",
          avatar: "https://i.pravatar.cc/150?img=3",
        }}
        dashboardData={dashboardData}
        accessibleRoutes={accessibleRoutes}
      />
    </div>
  );
}
