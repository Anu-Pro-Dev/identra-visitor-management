"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";

import { reports } from "../components/ReportListData";
import { ReportTableColumn } from "../components/ReportTableColumn";

export default function ReportsViewPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: reports,
    columns: ReportTableColumn,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <div className="w-full py-4">
        <div className="w-full space-y-4 sm:space-y-6">
          <h4 className="font-bold text-lg sm:text-xl lg:text-2xl tracking-tight text-primary flex items-center gap-2">
            <span className="inline-block w-1.5 h-4 sm:w-2 sm:h-6 rounded-full bg-primary/70"></span>
            Reports
          </h4>
          <p className="text-sm sm:text-base text-muted-foreground font-medium">
            View and export your reports here.
          </p>

          {/* Responsive Table Container */}
          <div className="w-full">
            {/* Mobile Card View for very small screens */}
            <div className="block sm:hidden space-y-3">
              {/* Implement mobile card view for reports here */}
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground">No results found.</p>
              </div>
            </div>

            {/* Table View for sm and larger screens */}
            <div className="hidden sm:block">
              <div className="w-full overflow-x-auto rounded-lg border bg-card border-border shadow-sm">
                <Table className="min-w-[600px] w-full">
                  <TableHeader>{/* Render table headers here */}</TableHeader>
                  <TableBody>
                    {/* Render table rows here */}
                    <TableRow>
                      <TableCell
                        colSpan={1}
                        className="h-24 text-center text-muted-foreground"
                      >
                        No results found.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
