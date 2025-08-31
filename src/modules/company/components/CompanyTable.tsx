"use client";
import * as React from "react";
import { Company } from "../types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/common/DataTable";
import { MoreVertical } from "lucide-react";
import { Pagination } from "@/components/common/Pagination";

const mockData: Company[] = [
  { id: "1", date: "2021-01-24", company: "Al Jazeera Tech Solutions", category: "VIP" },
  { id: "2", date: "2021-01-24", company: "Noor Enterprises", category: "parents/customer" },
  { id: "3", date: "2021-01-24", company: "Emiratix Innovations", category: "One time visitor" },
  { id: "4", date: "2021-01-24", company: "Arbia Nexus", category: "One time visitor" },
  { id: "5", date: "2021-01-24", company: "Falcon Gulf Ventures", category: "Regular-visitor-long term" },
  { id: "6", date: "2021-01-24", company: "Noor Enterprises", category: "VIP" },
];

export function CompanyTable({
  companyFilter,
  setCompanyFilter,
}: {
  companyFilter: string;
  setCompanyFilter: (value: string) => void;
}) {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [pageIndex, setPageIndex] = React.useState(0);
  const pageSize = 5;
  const filtered = mockData.filter((c) => c.company.toLowerCase().includes(companyFilter.toLowerCase()));
  const paged = filtered.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const columns = [
    { key: 'company' as keyof Company, label: 'Company' },
    { key: 'category' as keyof Company, label: 'Category' },
    { key: 'date' as keyof Company, label: 'Created on' },
  ];

  const renderCell = (row: Company, key: keyof Company) => {
    if (key === 'date') {
      return (
        <div className="flex items-center justify-between">
          <span>{row.date}</span>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4 text-[#64748B]" />
          </Button>
        </div>
      );
    }
    return row[key] as React.ReactNode;
  };

  return (
    <Card className="w-full rounded-md p-4 overflow-x-auto">
      <DataTable
        columns={columns}
        data={paged}
        renderCell={renderCell}
        selectable={true}
        selected={selected}
        onSelectionChange={(sel) => setSelected(sel as string[])}
      />
      <div className="pt-2">
        <Pagination
          page={pageIndex + 1}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={(p) => setPageIndex(p - 1)}
        />
      </div>
    </Card>
  );
}
