
import { Table } from "@tanstack/react-table";
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
}

export function DataTablePagination<TData>({
	table,
}: DataTablePaginationProps<TData>) {
	const currentPage = table.getState().pagination.pageIndex;
	const pageCount = table.getPageCount();
	const pageSize = table.getState().pagination.pageSize;

	const pagesToShow = 5;
	const halfPages = Math.floor(pagesToShow / 2);

	let startPage = Math.max(currentPage - halfPages, 0);
	let endPage = Math.min(startPage + pagesToShow, pageCount);

	if (endPage - startPage < pagesToShow) {
		startPage = Math.max(endPage - pagesToShow, 0);
	}

	const pages = [];
	for (let i = startPage; i < endPage; i++) {
		pages.push(i);
	}

	return (
		<div className="flex items-center justify-between mb-4 w-full">
						<div className="flex items-center justify-between pb-6 bg-card/80 rounded-b-2xl pt-5 px-10 w-full border-t border-border shadow-lg backdrop-blur-md">
							<div className="flex items-center space-x-3 text-base text-muted-foreground">
								<Select
									value={`${pageSize}`}
									onValueChange={(value) => {
										table.setPageSize(Number(value));
									}}
								>
									<SelectTrigger className="h-9 w-[80px] text-muted-foreground rounded-xl shadow bg-background/80 border border-border font-semibold">
										<SelectValue placeholder={pageSize} />
									</SelectTrigger>
									<SelectContent side="top">
										{[10, 20, 30, 40, 50].map((size) => (
											<SelectItem key={size} value={`${size}`} className="rounded-lg">
												{size}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<p className="text-base text-muted-foreground font-semibold">Rows per page</p>
							</div>
							<div className="flex items-center space-x-8">
								<div className="flex items-center space-x-2">
									<Button
										variant="outline"
										className="h-9 w-9 p-0 border-none text-muted-foreground rounded-full bg-background/70 hover:bg-accent/60 shadow"
										onClick={() => table.setPageIndex(0)}
										disabled={currentPage === 0}
									>
										<span className="sr-only">Go to first page</span>
										&lt;
									</Button>
									{startPage > 0 && <span className="text-muted-foreground font-bold">...</span>}
									{pages.map((page) => (
										<Button
											key={page}
											variant="outline"
											className={`h-9 w-9 p-0 border-none rounded-full font-bold transition-all duration-150 shadow-sm ${
												currentPage === page
													? "bg-primary text-primary-foreground scale-110 ring-2 ring-primary/30"
													: "bg-transparent text-muted-foreground hover:bg-accent/40"
											}`}
											onClick={() => table.setPageIndex(page)}
										>
											{page + 1}
										</Button>
									))}
									{endPage < pageCount && <span className="text-muted-foreground font-bold">...</span>}
									<Button
										variant="outline"
										className="h-9 w-9 p-0 border-none text-muted-foreground rounded-full bg-background/70 hover:bg-accent/60 shadow"
										onClick={() => table.setPageIndex(pageCount - 1)}
										disabled={currentPage === pageCount - 1}
									>
										<span className="sr-only">Go to last page</span>
										&gt;
									</Button>
								</div>
							</div>
						</div>
		</div>
	);
}
