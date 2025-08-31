// Placeholder for badge table columns. Replace with actual columns as needed.
import { ColumnDef } from "@tanstack/react-table";

export type Badge = {
  id: string;
  visitorName: string;
  badgeNumber: string;
  issuedDate: string;
  status: string;
};

export const BadgeTableColumn: ColumnDef<Badge>[] = [
  {
    accessorKey: "visitorName",
    header: "Visitor Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "badgeNumber",
    header: "Badge Number",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "issuedDate",
    header: "Issued Date",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => info.getValue(),
  },
];
