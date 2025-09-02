import RegisterPage from "@/modules/register/view/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Visitor - Identra Visitor Management",
  description: "Register new visitors and manage their access to your facility",
};

export default function RegisterPageRoute() {
  return (
      <RegisterPage
        dashboardData={{
          stats: {},
          navigation: { navMain: [], secondaryNav: [] },
          accessibleRoutes: [],
        }}
      />
  );
}
