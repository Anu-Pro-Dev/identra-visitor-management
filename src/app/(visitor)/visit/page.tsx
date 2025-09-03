import VisitorRegistrationPage from "@/modules/visitor-registration/view/page";

interface PageProps {
  searchParams: Promise<{
    host?: string;
    hostId?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  return <VisitorRegistrationPage searchParams={params} />;
}

export const metadata = {
  title: "Visitor Registration - Identra",
  description: "Register your visit request with Identra Visitor Management System",
};
