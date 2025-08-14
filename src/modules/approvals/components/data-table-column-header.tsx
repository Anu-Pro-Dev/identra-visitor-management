
import { Column } from "@tanstack/react-table";
import { ArrowUp, ArrowDown } from "lucide-react";
import React from "react";

interface DataTableColumnHeaderProps<TData, TValue> {
	column: Column<TData, TValue>;
	title: string;
}

export function DataTableColumnHeader<TData, TValue>({ column, title }: DataTableColumnHeaderProps<TData, TValue>) {
	const isSorted = column.getIsSorted();
	return (
		<div
			className="flex items-center gap-2 cursor-pointer select-none"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			role="button"
			tabIndex={0}
			onKeyDown={e => {
				if (e.key === "Enter" || e.key === " ") {
					column.toggleSorting(column.getIsSorted() === "asc");
				}
			}}
		>
			<span>{title}</span>
			{isSorted === "asc" && <ArrowUp className="w-4 h-4" />}
			{isSorted === "desc" && <ArrowDown className="w-4 h-4" />}
		</div>
	);
}
