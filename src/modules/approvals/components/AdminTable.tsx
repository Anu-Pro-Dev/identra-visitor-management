
'use client'

import * as React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	SortingState,
	ColumnFiltersState,
	VisibilityState,
} from "@tanstack/react-table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

	interface DataTableProps<TData, TValue> {
		columns: ColumnDef<TData, TValue>[];
		data: any[];
		statusFilter: string;
		setStatusFilter: (status: string) => void;
	}

	export function AdminTable<TData, TValue>({
		data,
		columns,
		statusFilter,
		setStatusFilter,
	}: DataTableProps<TData, TValue>) {
		const [sorting, setSorting] = React.useState<SortingState>([]);
		const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
		const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
		const [rowSelection, setRowSelection] = React.useState({});

		const statusContent: Record<string, { title: string; description: string }> = {
			pending: {
				title: "Pending Visitors",
				description: "Choose whether you reject or approve visitor request",
			},
			approved: {
				title: "Approved Visitors",
				description: "Upcoming visitors that you have upload earlier",
			},
			rejected: {
				title: "Rejected Visitors",
				description: "Rejected visitors can be reviewed here",
			},
			cancelled: {
				title: "Cancelled",
				description: "Visitors who are cancelled by host can be viewed here",
			},
			"pending security": {
				title: "Pending by Host",
				description: "Visitors who are Yet to take action by Security can be viewd here",
			},
			"rejected by security": {
				title: "Rejected by Host",
				description: "Visitors who are cancelled by host can be viewed here",
			},
		};

		const table = useReactTable({
			data,
			columns,
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
			<div className="mt-4 w-full overflow-x-auto">
				<DataTableToolbar 
					table={table}  
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
				/>
				<div className="rounded-2xl border bg-card border-border shadow-xl transition-shadow duration-300 hover:shadow-2xl min-w-[600px]">
					<div className="px-10 space-y-2 pt-7 pb-5 border-b border-border bg-gradient-to-r from-background via-card to-background rounded-t-2xl">
						<h4 className="font-extrabold text-2xl tracking-tight text-primary flex items-center gap-2">
							<span className="inline-block w-2 h-6 rounded-full bg-primary/70"></span>
							{statusContent[statusFilter]?.title}
						</h4>
						<p className="text-base text-muted-foreground font-medium">
							{statusContent[statusFilter]?.description}
						</p>
						<div className="flex gap-2 mt-8 flex-wrap">
							{[
								"pending", "approved", "rejected", "cancelled","pending security","rejected by security"
							].map((status) => (
								<button
									key={status}
									onClick={() => setStatusFilter(status)}
									className={`capitalize px-5 py-2 rounded-full border-2 transition-all duration-200 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 ${
										statusFilter === status
											? "border-primary bg-primary/10 text-primary font-bold scale-105"
											: "border-transparent bg-muted text-muted-foreground hover:bg-accent/60"
									}`}
									style={{minWidth:'120px'}}
								>
									{status.replace('pending security','pending sec.').replace('rejected by security','rejected sec.')}
								</button>
							))}
						</div>
					</div>
					<div className="w-full overflow-x-auto">
						<Table className="bg-card rounded-b-2xl overflow-hidden min-w-full">
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id} className="">
										{headerGroup.headers.map((header: any) => (
											<TableHead key={header.id} className="px-8 py-4 font-bold text-lg text-muted-foreground bg-background/60 backdrop-blur-md border-b border-border first:rounded-bl-2xl last:rounded-br-2xl">
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext()
														)}
											</TableHead>
										))}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row: any) => (
										<TableRow
											key={row.id}
											data-state={row.getIsSelected() && "selected"}
											className="border-0 hover:bg-accent/40 transition-colors duration-150"
										>
											{row.getVisibleCells().map((cell: any) => (
												<TableCell key={cell.id} className="px-8 py-4 font-medium text-base text-foreground">
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
											No results.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</div>
				<DataTablePagination table={table} />
			</div>
		);
	}
