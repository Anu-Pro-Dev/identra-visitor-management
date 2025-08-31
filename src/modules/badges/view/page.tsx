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

import { badges } from "../components/BadgeListData";
import { BadgeTableColumn } from "../components/BadgeTableColumn";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/common/Pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BadgesViewPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: badges,
    columns: BadgeTableColumn,
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
            Badges
          </h4>
          <p className="text-sm sm:text-base text-muted-foreground font-medium">
            Manage visitor badges here.
          </p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search by visitor name..."
              value={(table.getColumn("visitorName")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("visitorName")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Input
              placeholder="Search by badge number..."
              value={(table.getColumn("badgeNumber")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("badgeNumber")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Select
              value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
              onValueChange={(value) =>
                table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Responsive Table Container */}
          <div className="w-full">
            {/* Mobile Card View for very small screens */}
            <div className="block sm:hidden space-y-3">
              {/* Implement mobile card view for badges here */}
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground">No badges found.</p>
              </div>
            </div>

            {/* Table View for sm and larger screens */}
            <div className="hidden sm:block">
              <div className="w-full overflow-x-auto rounded-lg border bg-card border-border shadow-sm">
                <Table className="min-w-[600px] w-full">
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableCell key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : header.column.getCanSort() ? (
                                    <button
                                      onClick={header.column.getToggleSortingHandler()}
                                      className="flex items-center gap-2"
                                    >
                                      {header.column.columnDef.header as string}
                                      {{
                                        asc: "🔼",
                                        desc: "🔽",
                                      }[header.column.getIsSorted() as string] ?? null}
                                    </button>
                                  ) : (
                                    header.column.columnDef.header as string
                                  )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {cell.renderValue() as string}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={table.getAllColumns().length}
                          className="h-24 text-center text-muted-foreground"
                        >
                          No badges found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Pagination */}
            <Pagination
              page={table.getState().pagination.pageIndex + 1}
              pageSize={table.getState().pagination.pageSize}
              total={table.getFilteredRowModel().rows.length}
              onPageChange={(page) => table.setPageIndex(page - 1)}
              onPageSizeChange={(pageSize) => table.setPageSize(pageSize)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
