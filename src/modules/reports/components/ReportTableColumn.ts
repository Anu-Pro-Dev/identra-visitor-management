// Placeholder for report table columns. Replace with actual columns as needed.
import { ColumnDef } from "@tanstack/react-table";

export type Report = {
  id: string;
  name: string;
  date: string;
  status: string;
};

export const ReportTableColumn: ColumnDef<Report>[] = [
  {
    accessorKey: "name",
    header: "Report Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => info.getValue(),
  },
];
