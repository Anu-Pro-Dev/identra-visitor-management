import { VisitorRegistrationForm } from "../components/VisitorRegistrationForm";

interface VisitorRegistrationPageProps {
  searchParams: {
    host?: string;
    hostId?: string;
  };
}

export default function VisitorRegistrationPage({
  searchParams,
}: VisitorRegistrationPageProps) {
  const { host, hostId } = searchParams;

  return (
    <VisitorRegistrationForm
      hostName={host || ""}
      hostId={hostId || ""}
    />
  );
}
