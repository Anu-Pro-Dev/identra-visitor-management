// Placeholder for role table columns. Replace with actual columns as needed.
import { ColumnDef } from "@tanstack/react-table";

export type Role = {
  id: string;
  name: string;
  description: string;
  permissions: string;
};

export const RoleTableColumn: ColumnDef<Role>[] = [
  {
    accessorKey: "name",
    header: "Role Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: (info) => info.getValue(),
  },
];
