"use client";

import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { AnimatePresence } from "framer-motion";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

export interface TableColumn<T> {
  key: string;
  header: string;
  accessor: (item: T, isRTL?: boolean) => React.ReactNode;
  width?: string;
  className?: string;
}

interface GenericTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  selected: Array<string | number>;
  page: number;
  pageSize: number;
  allChecked: boolean;
  getItemId: (item: T) => string | number;
  getItemDisplayName: (item: T, isRTL?: boolean) => string;
  onSelectItem: (id: string | number) => void;
  onSelectAll: () => void;
  onEditItem?: (item: T) => void;
  onDeleteItem?: (id: string | number) => void;
  actions?: (item: T) => React.ReactNode;
  noDataMessage: string;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function GenericTable<T>({
  data,
  columns,
  selected,
  page,
  pageSize,
  allChecked,
  getItemId,
  getItemDisplayName,
  onSelectItem,
  onSelectAll,
  onEditItem,
  onDeleteItem,
  actions,
  noDataMessage,
  isLoading = false,
  onPageChange,
  onPageSizeChange,
}: GenericTableProps<T>) {
  const { t } = useTranslation();
  const isRTL = false; // Default to LTR, can be enhanced later

  if (data.length === 0) {
    return (
      <div className="overflow-x-auto rounded-b-3xl px-4">
        <div className="backdrop-blur-xl mt-4 bg-card/70 border border-border rounded-2xl overflow-hidden">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              Loading...
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              {noDataMessage}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full grid grid-cols-1 rounded-b-3xl px-4">
      <div className="backdrop-blur-xl mt-4 bg-card/70 border border-border rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow
              className={`bg-gradient-to-${
                isRTL ? "l" : "r"
              } from-primary/10 to-background/80 backdrop-blur-md`}
            >
              <TableHead className="w-12 text-center">
                <Checkbox
                  checked={allChecked}
                  onCheckedChange={onSelectAll}
                  aria-label={t("common.selectAll") || "Select All"}
                />
              </TableHead>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={`text-base font-bold text-primary drop-shadow-sm tracking-wide ${
                    column.width || ""
                  } ${column.className || ""}`}
                >
                  {column.header}
                </TableHead>
              ))}
              {(onEditItem || onDeleteItem || actions) && (
                <TableHead className="w-32 text-center text-base font-bold text-primary drop-shadow-sm tracking-wide">
                  {t("common.actions") || "Actions"}
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {data
                .filter((item) => item && getItemId(item) !== undefined)
                .map((item, idx) => {
                  const itemId = getItemId(item);
                  return (
                    <TableRow
                      key={itemId}
                      className={
                        ((page - 1) * pageSize + idx) % 2 === 0
                          ? "bg-card/60 hover:bg-primary/10 transition-all border-b border-border"
                          : "bg-card/40 hover:bg-primary/10 transition-all border-b border-border"
                      }
                      style={{ backdropFilter: "blur(8px)" }}
                    >
                      <TableCell className="text-center">
                        <Checkbox
                          checked={selected.includes(itemId)}
                          onCheckedChange={() => onSelectItem(itemId)}
                          aria-label={`${
                            t("common.select") || "Select"
                          } ${getItemDisplayName(item, isRTL)}`}
                        />
                      </TableCell>
                      {columns.map((column) => (
                        <TableCell
                          key={column.key}
                          className="text-foreground text-md drop-shadow-sm"
                        >
                          {column.accessor(item, isRTL)}
                        </TableCell>
                      ))}
                      {(onEditItem || onDeleteItem || actions) && (
                        <TableCell
                          className={`text-center flex ${
                            isRTL ? "flex-row-reverse" : "flex-row"
                          } gap-2 justify-center`}
                        >
                          {actions ? (
                            actions(item)
                          ) : (
                            <>
                              {onEditItem && (
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="p-2 rounded-full group cursor-pointer"
                                  onClick={() => onEditItem(item)}
                                  aria-label={t("common.edit") || "Edit"}
                                >
                                  <FiEdit2 className="text-primary group-hover:scale-110 transition-transform" />
                                </Button>
                              )}
                              {onDeleteItem && (
                                <Button
                                  size="icon"
                                  variant="destructive"
                                  className="p-2 rounded-full group cursor-pointer"
                                  onClick={() => onDeleteItem(itemId)}
                                  aria-label={t("common.delete") || "Delete"}
                                >
                                  <FiTrash2 className="text-white group-hover:scale-110 transition-transform" />
                                </Button>
                              )}
                            </>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
