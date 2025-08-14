"use client";
import { useState } from "react";
import { CompanyHeader } from "../components/CompanyHeader";
import { CompanyTable } from "../components/CompanyTable";

export default function CompanyPageView() {
  const [companyFilter, setCompanyFilter] = useState("");
  return (
    <div className="flex flex-col w-full overflow-hidden p-4 md:px-8 gap-5 bg-background min-h-screen">
      <CompanyHeader companyFilter={companyFilter} setCompanyFilter={setCompanyFilter} />
      <CompanyTable companyFilter={companyFilter} setCompanyFilter={setCompanyFilter} />
    </div>
  );
}
