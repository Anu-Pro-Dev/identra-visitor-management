"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VisitorsViewPage from "@/modules/visitors/view/page";
import { AuthClient } from "@/lib/auth/client";
import { PageLoader } from "@/components/common/PageLoader";

export default function VisitorsPage() {
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

        const hasVisitorsAccess = await AuthClient.validatePermission("visitors", "read");
        if (!hasVisitorsAccess) {
          router.push("/dashboard");
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

  return <VisitorsViewPage />;
}
