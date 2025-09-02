"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VisitorsViewPage from "@/modules/visitors/view/page";
import { AuthClient } from "@/lib/auth/client";

export default function VisitorsPageWrapper() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        // Check if user is authenticated
        const user = await AuthClient.getCurrentUser();
        if (!user) {
          router.push("/");
          return;
        }

        // Check visitor permissions
        const hasVisitorAccess = await AuthClient.validatePermission("visitors", "read");
        if (!hasVisitorAccess) {
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return null; // Will redirect
  }

  return <VisitorsViewPage />;
}
