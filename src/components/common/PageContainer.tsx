import React from "react";

interface PageContainerProps {
  title?: string;
  loading?: boolean;
  error?: string | null;
  children: React.ReactNode;
}

export function PageContainer({ title, loading, error, children }: PageContainerProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <span className="text-lg text-muted-foreground">Loading...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <span className="text-lg text-destructive">{error}</span>
      </div>
    );
  }
  return (
    <section className="flex flex-col gap-6 w-full">
      {title && <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">{title}</h2>}
      {children}
    </section>
  );
}
