"use client";

import { useEffect, useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { CategoryTable } from "../components/CategoryTable";
import { AuthClient, User } from "@/lib/auth/client";
import { redirect } from "next/navigation";
import { PageLoader } from "@/components/common/PageLoader";

export default function CategoriesPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await AuthClient.getCurrentUser();
      setCurrentUser(user);
      setLoading(false);
      
      // Only allow admin users to access categories
      if (!user || user.role !== "admin") {
        redirect("/dashboard");
      }
    };
    
    checkAuth();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  if (!currentUser || currentUser.role !== "admin") {
    redirect("/dashboard");
    return null;
  }

  return (
    <PageContainer>
      <CategoryTable />
    </PageContainer>
  );
}
