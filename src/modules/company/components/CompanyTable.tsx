"use client";
import * as React from "react";
import { Company } from "../types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "@/hooks/useTranslation";
import { GenericTable, TableColumn } from "@/components/common/GenericTable";
import { CustomPagination } from "@/components/common/Pagination";

const mockData: Company[] = [
  { id: "1", date: "2021-01-24", company: "Al Jazeera Tech Solutions", category: "VIP" },
  { id: "2", date: "2021-01-24", company: "Noor Enterprises", category: "parents/customer" },
  { id: "3", date: "2021-01-24", company: "Emiratix Innovations", category: "One time visitor" },
  { id: "4", date: "2021-01-24", company: "Arbia Nexus", category: "One time visitor" },
  { id: "5", date: "2021-01-24", company: "Falcon Gulf Ventures", category: "Regular-visitor-long term" },
  { id: "6", date: "2021-01-24", company: "Noor Enterprises", category: "VIP" },
];

// ...existing code...
export function CompanyTable(props: { companyFilter: string; setCompanyFilter: (value: string) => void }) {
  const { companyFilter, setCompanyFilter } = props;
  const { t } = useTranslation();
  const [selected, setSelected] = React.useState<Array<string | number>>([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const pageSizeOptions = [5, 10, 20, 50];
  const filtered = mockData.filter((c) => c.company.toLowerCase().includes(companyFilter.toLowerCase()));
  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const genericColumns: TableColumn<Company>[] = [
    {
      key: "company",
      header: t("common.company"),
      accessor: (item) => item.company,
    },
    {
      key: "category",
      header: t("common.category"),
      accessor: (item) => item.category,
    },
    {
      key: "date",
      header: t("common.createdOn"),
      accessor: (item) => item.date,
    },
  ];

  const getItemId = (item: Company) => item.id;
  const getItemDisplayName = (item: Company) => item.company;
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
    <Card className="w-full rounded-md p-4 overflow-x-auto">
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
        noDataMessage={t("common.noResults")}
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
  </Card>
  );
}
