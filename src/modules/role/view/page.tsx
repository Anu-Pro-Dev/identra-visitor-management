"use client";

import * as React from "react";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { GenericTable, TableColumn } from "@/components/common/GenericTable";
import { CustomPagination } from "@/components/common/Pagination";
import { Input } from "@/components/ui/input";
import { roles } from "../components/RoleListData";
import { Role } from "../components/RoleTableColumn";

export default function RolesViewPage() {
  const { t } = useTranslation();
  const [roleData, setRoleData] = useState<Role[]>(roles);
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageSizeOptions = [10, 20, 50, 100];
  
  // Filter states
  const [nameFilter, setNameFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");

  // Apply filters
  const filteredData = roleData.filter((role) => {
    const matchesName = role.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesDescription = role.description.toLowerCase().includes(descriptionFilter.toLowerCase());
    
    return matchesName && matchesDescription;
  });

  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Table columns for GenericTable
  const genericColumns: TableColumn<Role>[] = [
    {
      key: "name",
      header: t("common.roleName") || "Role Name",
      accessor: (item) => item.name,
    },
    {
      key: "description",
      header: t("common.description") || "Description",
      accessor: (item) => item.description,
    },
    {
      key: "permissions",
      header: t("common.permissions") || "Permissions",
      accessor: (item) => item.permissions,
    },
  ];

  // Selection logic
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const getItemId = (item: Role) => item.id;
  const getItemDisplayName = (item: Role) => item.name;
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
            {t("common.roles") || "Roles"}
          </h4>
          <p className="text-sm sm:text-base text-muted-foreground font-medium">
            {t("common.manageUserRoles") || "Manage user roles here."}
          </p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder={t("common.searchByRoleName") || "Search by role name..."}
              value={nameFilter}
              onChange={(event) => setNameFilter(event.target.value)}
              className="max-w-sm"
            />
            <Input
              placeholder={t("common.searchByDescription") || "Search by description..."}
              value={descriptionFilter}
              onChange={(event) => setDescriptionFilter(event.target.value)}
              className="max-w-sm"
            />
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
              noDataMessage={t("common.noRolesFound") || "No roles found."}
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
