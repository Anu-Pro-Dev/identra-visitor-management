"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { visitors } from "../components/VisitorListData";
import { TableColumn } from "../components/TableColumn";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  ColumnDef,
} from "@tanstack/react-table";

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
  const [statusFilter, setStatusFilter] = React.useState("pending");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: visitors,
    columns: TableColumn,
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

          {/* Responsive Table Container */}
          <div className="w-full">
            {/* Mobile Card View for very small screens */}
            <div className="block sm:hidden space-y-3">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row: any) => (
                  <div
                    key={row.id}
                    className="bg-card border border-border rounded-lg p-4 space-y-2 shadow-sm"
                  >
                    {row.getVisibleCells().map((cell: any) => {
                      // Get the actual column title from DataTableColumnHeader or fallback
                      let columnTitle = "";

                      if (cell.column.id === "select") {
                        return null; // Skip checkbox column in mobile view
                      } else if (cell.column.id === "name") {
                        columnTitle = "Visitor Name";
                      } else if (cell.column.id === "spanText") {
                        columnTitle = "Category";
                      } else if (cell.column.id === "visitorsNumber") {
                        columnTitle = "No. of visitors";
                      } else if (cell.column.id === "date") {
                        columnTitle = "Date";
                      } else if (cell.column.id === "fromTime") {
                        columnTitle = "From time";
                      } else if (cell.column.id === "toTime") {
                        columnTitle = "To time";
                      } else if (cell.column.id === "actions") {
                        columnTitle = "Actions";
                      } else {
                        columnTitle = cell.column.id || "Field";
                      }

                      return (
                        <div
                          key={cell.id}
                          className="flex justify-between items-start"
                        >
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            {columnTitle}
                          </span>
                          <span className="text-sm font-medium text-foreground text-right max-w-[60%]">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))
              ) : (
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <p className="text-muted-foreground">No results found.</p>
                </div>
              )}
            </div>

            {/* Table View for sm and larger screens */}
            <div className="hidden sm:block">
              <div className="w-full overflow-x-auto rounded-lg border bg-card border-border shadow-sm">
                <Table className="min-w-[600px] w-full">
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id} className="border-b">
                        {headerGroup.headers.map((header: any) => (
                          <TableHead
                            key={header.id}
                            className="px-3 sm:px-4 lg:px-6 py-3 font-semibold text-sm text-muted-foreground bg-muted/50"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row: any) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                          className="border-b hover:bg-muted/50 transition-colors"
                        >
                          {row.getVisibleCells().map((cell: any) => (
                            <TableCell
                              key={cell.id}
                              className="px-3 sm:px-4 lg:px-6 py-3 text-sm font-medium text-foreground"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={TableColumn.length}
                          className="h-24 text-center text-muted-foreground"
                        >
                          No results found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Pagination - Mobile optimized */}
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm text-muted-foreground">
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger className="h-8 w-16 sm:w-20 text-muted-foreground rounded-md shadow-sm bg-background border border-border">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((size) => (
                    <SelectItem key={size} value={`${size}`}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                rows
              </p>
            </div>

            <div className="flex items-center justify-center space-x-1 sm:space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => table.setPageIndex(0)}
                disabled={table.getState().pagination.pageIndex === 0}
              >
                &lt;&lt;
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                &lt;
              </Button>

              {/* Page info for mobile */}
              <div className="flex items-center px-2">
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                &gt;
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={
                  table.getState().pagination.pageIndex ===
                  table.getPageCount() - 1
                }
              >
                &gt;&gt;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
