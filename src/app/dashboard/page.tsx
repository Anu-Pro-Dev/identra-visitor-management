"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardView from "@/modules/dashboard/view/page";
import { AuthClient } from "@/lib/auth/client";
import { PageLoader } from "@/components/common/PageLoader";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const user = await AuthClient.getCurrentUser();
        if (!user) {
          router.push("/");
          return;
        }

        const hasDashboardAccess = await AuthClient.validatePermission("dashboard", "read");
        if (!hasDashboardAccess) {
          router.push("/");
          return;
        }

        setHasAccess(true);
      } catch (error) {
        console.error("Access check failed:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [router]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!hasAccess) {
    return null;
  }

  return <DashboardView />;
}
