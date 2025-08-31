

import { Table } from "@tanstack/react-table";
import React from "react";
import { Pagination } from "@/components/common/Pagination";

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
	const currentPage = table.getState()?.pagination.pageIndex + 1 || 1;
	const pageSize = table.getState().pagination.pageSize;
	const total = table.getFilteredRowModel().rows.length;

	return (
		<Pagination
			page={currentPage}
			pageSize={pageSize}
			total={total}
			onPageChange={(p) => table.setPageIndex(p - 1)}
			onPageSizeChange={(size) => table.setPageSize(size)}
		/>
	);
}

