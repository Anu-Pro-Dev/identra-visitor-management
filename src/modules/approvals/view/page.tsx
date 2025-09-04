"use client";

import * as React from "react";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { GenericTable, TableColumn } from "@/components/common/GenericTable";
import { CustomPagination } from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { visitors, Visitor } from "../components/VisitorListData";

const statusTabs = [
  "pending",
  "approved",
  "rejected",
  "cancelled",
  "pending security",
  "rejected by security",
];

const statusContent: Record<string, { title: string; description: string }> = {
  pending: {
    title: "Pending Visitors",
    description: "Choose whether you reject or approve visitor request",
  },
  approved: {
    title: "Approved Visitors",
    description: "Upcoming visitors that you have upload earlier",
  },
  rejected: {
    title: "Rejected Visitors",
    description: "Rejected visitors can be reviewed here",
  },
  cancelled: {
    title: "Cancelled",
    description: "Visitors who are cancelled by host can be viewed here",
  },
  "pending security": {
    title: "Pending by Host",
    description:
      "Visitors who are Yet to take action by Security can be viewd here",
  },
  "rejected by security": {
    title: "Rejected by Host",
    description: "Visitors who are cancelled by host can be viewed here",
  },
};

export default function ApprovalsViewPage() {
  const { t } = useTranslation();
  const [statusFilter, setStatusFilter] = useState("pending");
  const [visitorData, setVisitorData] = useState<Visitor[]>(visitors);
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageSizeOptions = [10, 20, 50, 100];

  // Apply status filter
  const filteredData = visitorData.filter((visitor) => {
    return visitor.status === statusFilter || visitor.statusFinal === statusFilter;
  });

  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Table columns for GenericTable
  const genericColumns: TableColumn<Visitor>[] = [
    {
      key: "name",
      header: t("common.visitorName") || "Visitor Name",
      accessor: (item) => item.name,
    },
    {
      key: "spanText",
      header: t("common.category") || "Category",
      accessor: (item) => item.spanText,
    },
    {
      key: "visitorsNumber",
      header: t("common.visitorsNumber") || "Visitors #",
      accessor: (item) => item.visitorsNumber?.toString() || "-",
    },
    {
      key: "company",
      header: t("common.company") || "Company",
      accessor: (item) => item.company,
    },
    {
      key: "time",
      header: t("common.time") || "Time",
      accessor: (item) => item.time,
    },
    {
      key: "status",
      header: t("common.status") || "Status",
      accessor: (item) => item.status,
    },
  ];

  // Selection logic
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const getItemId = (item: Visitor) => item.id?.toString() || item.name;
  const getItemDisplayName = (item: Visitor) => item.name;
  const handleSelectItem = (id: string | number) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  const handleSelectAll = () => {
    if (selected.length === paginatedData.length) {
      setSelected([]);
    } else {
      setSelected(paginatedData.map(getItemId));
    }
  };

  // Mobile-first responsive design with proper breakpoints
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      {/* Mobile: full width, minimal padding */}
      <div className="w-full py-4">
        <div className="w-full space-y-4 sm:space-y-6">
          {/* Status Tabs - Mobile optimized */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-2 sm:gap-3">
            {statusTabs.map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                className={`capitalize px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  statusFilter === status ? "scale-105" : ""
                }`}
                onClick={() => setStatusFilter(status)}
              >
                {status
                  .replace("pending security", "pending sec.")
                  .replace("rejected by security", "rejected sec.")}
              </Button>
            ))}
          </div>

          {/* Title & Description - Mobile optimized */}
          <div className="space-y-2">
            <h4 className="font-bold text-lg sm:text-xl lg:text-2xl tracking-tight text-primary flex items-center gap-2">
              <span className="inline-block w-1.5 h-4 sm:w-2 sm:h-6 rounded-full bg-primary/70"></span>
              {statusContent[statusFilter]?.title}
            </h4>
            <p className="text-sm sm:text-base text-muted-foreground font-medium">
              {statusContent[statusFilter]?.description}
            </p>
          </div>

          {/* Table and Pagination */}
          <div className="w-full space-y-4">
            <GenericTable
              data={paginatedData}
              columns={genericColumns}
              selected={selected}
              page={page}
              pageSize={pageSize}
              allChecked={selected.length === paginatedData.length && paginatedData.length > 0}
              getItemId={getItemId}
              getItemDisplayName={getItemDisplayName}
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
              noDataMessage={t("common.noVisitorsFound") || "No visitors found."}
              isLoading={false}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
            
            <CustomPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              pageSize={pageSize}
              pageSizeOptions={pageSizeOptions}
              onPageSizeChange={setPageSize}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
