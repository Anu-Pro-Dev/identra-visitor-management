import { PageLoader } from "@/components/common/PageLoader";

export default function DashboardLoading() {
  return (
    <PageLoader
      message="Loading Dashboard..."
      size="lg"
      showLogo={true}
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30"
    />
  );
}
