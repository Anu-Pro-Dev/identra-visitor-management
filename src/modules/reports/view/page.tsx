"use client";

import * as React from "react";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { GenericTable, TableColumn } from "@/components/common/GenericTable";
import { CustomPagination } from "@/components/common/Pagination";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { reports } from "../components/ReportListData";
import { Report } from "../components/ReportTableColumn";

export default function ReportsViewPage() {
  const { t } = useTranslation();
  const [reportData, setReportData] = useState<Report[]>(reports);
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageSizeOptions = [10, 20, 50, 100];
  
  // Filter states
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Apply filters
  const filteredData = reportData.filter((report) => {
    const matchesName = report.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesStatus = statusFilter === "" || report.status === statusFilter;
    
    return matchesName && matchesStatus;
  });

  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Table columns for GenericTable
  const genericColumns: TableColumn<Report>[] = [
    {
      key: "name",
      header: t("common.reportName") || "Report Name",
      accessor: (item) => item.name,
    },
    {
      key: "date",
      header: t("common.date") || "Date",
      accessor: (item) => item.date,
    },
    {
      key: "status",
      header: t("common.status") || "Status",
      accessor: (item) => item.status,
    },
  ];

  // Selection logic
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const getItemId = (item: Report) => item.id;
  const getItemDisplayName = (item: Report) => item.name;
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

  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <div className="w-full py-4">
        <div className="w-full space-y-4 sm:space-y-6">
          <h4 className="font-bold text-lg sm:text-xl lg:text-2xl tracking-tight text-primary flex items-center gap-2">
            <span className="inline-block w-1.5 h-4 sm:w-2 sm:h-6 rounded-full bg-primary/70"></span>
            {t("common.reports") || "Reports"}
          </h4>
          <p className="text-sm sm:text-base text-muted-foreground font-medium">
            {t("common.viewExportReports") || "View and export your reports here."}
          </p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder={t("common.searchByReportName") || "Search by report name..."}
              value={nameFilter}
              onChange={(event) => setNameFilter(event.target.value)}
              className="max-w-sm"
            />
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value === "all" ? "" : value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("common.filterByStatus") || "Filter by status"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("common.allStatus") || "All Status"}</SelectItem>
                <SelectItem value="Completed">{t("common.completed") || "Completed"}</SelectItem>
                <SelectItem value="Pending">{t("common.pending") || "Pending"}</SelectItem>
              </SelectContent>
            </Select>
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
              noDataMessage={t("common.noReportsFound") || "No reports found."}
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
