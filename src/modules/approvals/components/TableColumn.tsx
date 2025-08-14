
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { TableRow } from "./TableRow";
import { Visitor } from "./VisitorListData";

export const TableColumn: ColumnDef<Visitor>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value: boolean | "indeterminate") => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value: boolean | "indeterminate") => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Visitor Name" />
		),
		cell: ({ row }) => <span>{row.getValue("name")}</span>,
	},
	{
		accessorKey: "spanText",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Category" />
		),
		cell: ({ row }) => <span>{row.getValue("spanText")}</span>,
	},
	{
		accessorKey: "visitorsNumber",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="No. of visitors" />
		),
		cell: ({ row }) => <span>{row.getValue("visitorsNumber")}</span>,
	},
	{
		accessorKey: "date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date" />
		),
		cell: ({ row }) => <span>{row.getValue("date")}</span>,
	},
	{
		accessorKey: "fromTime",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="From time" />
		),
		cell: ({ row }) => <span>{row.getValue("fromTime")}</span>,
	},
	{
		accessorKey: "toTime",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="To time" />
		),
		cell: ({ row }) => <span>{row.getValue("toTime")}</span>,
	},
	{
		id: "actions",
		cell: ({ row, table }) => {
			const statusFilter = table.getState().sorting.find((s: any) => s.id === "status")?.desc
				? "approved"
				: "pending";
			return <TableRow statusFilter={statusFilter} tableData={row.original} />;
		},
	},
];
