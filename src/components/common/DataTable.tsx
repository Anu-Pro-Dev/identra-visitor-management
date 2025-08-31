import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

export interface DataTableProps<T> {
  columns: { key: keyof T; label: string }[];
  data: T[];
  renderCell?: (row: T, key: keyof T) => React.ReactNode;
  selectable?: boolean;
  selected?: (string | number)[];
  onSelectionChange?: (selected: (string | number)[]) => void;
  idKey?: keyof T;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  renderCell,
  selectable = false,
  selected = [],
  onSelectionChange,
  idKey = 'id' as keyof T,
}: DataTableProps<T>) {
  const allSelected = data.length > 0 && selected.length === data.length;
  const someSelected = selected.length > 0 && selected.length < data.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange?.(data.map(row => row[idKey]));
    } else {
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (rowId: string | number, checked: boolean) => {
    if (checked) {
      onSelectionChange?.([...selected, rowId]);
    } else {
      onSelectionChange?.(selected.filter(id => id !== rowId));
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {selectable && (
            <TableHead>
              <Checkbox
                checked={allSelected}
                ref={node => {
                  if (node) {
                    const input = node.querySelector('input[type="checkbox"]');
                    if (input) {
                      (input as HTMLInputElement).indeterminate = someSelected;
                    }
                  }
                }}
                onCheckedChange={handleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
          )}
          {columns.map((col) => (
            <TableHead key={String(col.key)}>{col.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            {selectable && (
              <TableCell>
                <Checkbox
                  checked={selected.includes(row[idKey])}
                  onCheckedChange={(checked) => handleSelectRow(row[idKey], !!checked)}
                  aria-label="Select row"
                />
              </TableCell>
            )}
            {columns.map((col) => (
              <TableCell key={String(col.key)}>
                {renderCell ? renderCell(row, col.key) : (row[col.key] as React.ReactNode)}
              </TableCell>
            ))}
          </TableRow>
        ))}
        {data.length === 0 && (
          <TableRow>
            <TableCell colSpan={columns.length + (selectable ? 1 : 0)} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
