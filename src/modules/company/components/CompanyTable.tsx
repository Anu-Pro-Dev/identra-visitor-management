"use client";
import * as React from "react";
import { Company } from "../types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import { DataTablePagination } from "@/modules/approvals/components/data-table-pagination";

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

  return (
    <Card className="w-full bg-white rounded-md p-4 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              {/*
                Use a ref to set the indeterminate state since Checkbox does not accept an 'indeterminate' prop.
              */}
              <Checkbox
                ref={node => {
                  if (node) {
                    // @ts-ignore: accessing underlying input for indeterminate
                    if (node instanceof HTMLInputElement) {
                      node.indeterminate =
                        selected.length > 0 && selected.length < paged.length;
                    } else if (node instanceof HTMLElement) {
                      const input = node.querySelector('input[type="checkbox"]');
                      if (input) {
                        (input as HTMLInputElement).indeterminate =
                          selected.length > 0 && selected.length < paged.length;
                      }
                    }
                  }
                }}
                checked={selected.length === paged.length && paged.length > 0}
                onCheckedChange={(checked) => {
                  if (checked) setSelected(paged.map((c) => c.id));
                  else setSelected([]);
                }}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead className="font-bold text-[15px] text-[#9BA9D2]">Company</TableHead>
            <TableHead className="font-bold text-[15px] text-[#9BA9D2]">Category</TableHead>
            <TableHead className="font-bold text-[15px] text-[#9BA9D2]">Created on</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paged.length ? (
            paged.map((row) => (
              <TableRow key={row.id} data-state={selected.includes(row.id) ? "selected" : undefined}>
                <TableCell>
                  <Checkbox
                    checked={selected.includes(row.id)}
                    onCheckedChange={(checked) => {
                      if (checked) setSelected((s) => [...s, row.id]);
                      else setSelected((s) => s.filter((id) => id !== row.id));
                    }}
                    aria-label="Select row"
                  />
                </TableCell>
                <TableCell className="font-bold text-sm text-[#2B3674]">{row.company}</TableCell>
                <TableCell className="font-bold text-sm text-[#2B3674]">{row.category}</TableCell>
                <TableCell className="font-bold text-sm text-[#2B3674] flex items-center justify-between">
                  <span>{row.date}</span>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4 text-[#64748B]" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center border-0">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="pt-2">
        <DataTablePagination
          currentPage={pageIndex}
          onPageChange={setPageIndex}
          totalPages={Math.ceil(filtered.length / pageSize)}
        />
      </div>
    </Card>
  );
}
