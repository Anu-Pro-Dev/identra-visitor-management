import VisitorRegistrationPage from "@/modules/visitor-registration/view/page";

interface PageProps {
  searchParams: {
    host?: string;
    hostId?: string;
  };
}

export default function Page({ searchParams }: PageProps) {
  return <VisitorRegistrationPage searchParams={searchParams} />;
}

export const metadata = {
  title: "Visitor Registration - Identra",
  description: "Register your visit request with Identra Visitor Management System",
};
