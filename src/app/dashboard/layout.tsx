"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthClient } from "@/lib/auth/client";
import { PageLoader } from "@/components/common/PageLoader";
import { TopNavbar } from "@/components/layout/navbar";
import { useNavigation } from "@/hooks/useNavigation";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<"Admin" | "Host" | "Security">("Admin");
  const router = useRouter();
  const { navigationItems } = useNavigation(userRole);

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
    <div className="min-h-screen bg-background">
      <TopNavbar navItems={navigationItems} />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
