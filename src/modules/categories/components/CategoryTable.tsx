"use client";

import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { GenericTable, TableColumn } from "@/components/common/GenericTable";
import { CustomPagination } from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Category, CategoryFormData } from "../types";
import { AddCategoryDialog } from "./AddCategoryDialog";
import { mockCategories } from "../data/mockCategories";
import { toast } from "sonner";

export function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const { t } = useTranslation();
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageSizeOptions = [10, 20, 50, 100];
  const paginatedData = categories.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(categories.length / pageSize);

  const handleAddCategory = (categoryData: CategoryFormData) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name: categoryData.name,
      color: categoryData.color,
      createdAt: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).replace(/\//g, "."),
      description: categoryData.description,
    };
    
    setCategories([...categories, newCategory]);
  };

  // Table columns for GenericTable
  const genericColumns: TableColumn<any>[] = [
    {
      key: "name",
      header: t("common.category"),
      accessor: (item) => item.name,
    },
    {
      key: "description",
      header: t("common.description"),
      accessor: (item) => item.description,
    },
    {
      key: "createdAt",
      header: t("common.createdOn"),
      accessor: (item) => item.createdAt,
    },
  ];

  // Selection logic
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const getItemId = (item: any) => item.id as string;
  const getItemDisplayName = (item: any) => item.name;
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("common.category")}</h1>
          <p className="text-sm text-muted-foreground">{t("common.category")}</p>
        </div>
        <div className="flex items-center gap-3">
          <AddCategoryDialog onAdd={handleAddCategory} />
          {selected.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => {
                setCategories(categories.filter((cat) => !selected.includes(cat.id)));
                setSelected([]);
                toast.success(`${selected.length} ${t("common.category")} ${t("common.delete")}`);
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {t("common.delete")}
            </Button>
          )}
        </div>
      </div>
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
    </div>
  );
}
