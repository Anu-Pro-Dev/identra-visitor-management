
'use client'

import * as React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { GenericTable, TableColumn } from "@/components/common/GenericTable";
import { CustomPagination } from "@/components/common/Pagination";

	interface DataTableProps<TData, TValue> {
		columns: any[];
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
		const { t } = useTranslation();

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

		// Pagination state
		const [page, setPage] = React.useState(1);
		const [pageSize, setPageSize] = React.useState(10);
		const pageSizeOptions = [10, 20, 50, 100];
		const paginatedData = React.useMemo(() => {
			const start = (page - 1) * pageSize;
			return data.slice(start, start + pageSize);
		}, [data, page, pageSize]);
		const totalPages = Math.ceil(data.length / pageSize);

		// Map columns to TableColumn format for GenericTable
		const genericColumns: TableColumn<any>[] = columns.map((col: any) => ({
			key: col.id || col.accessorKey || col.header,
			header: typeof col.header === 'string' ? col.header : '',
			accessor: (item: any) => {
				if (typeof col.cell === 'function') {
					return col.cell({ row: { original: item } });
				}
				return item[col.accessorKey];
			},
		}));

	// Selection logic
	const [selected, setSelected] = React.useState<Array<string | number>>([]);
	const getItemId = (item: any) => item.id;
	const getItemDisplayName = (item: any) => item.name || item.id;
	const handleSelectItem = (id: string | number) => {
		setSelected((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
	};
	const handleSelectAll = () => {
		if (selected.length === paginatedData.length) {
			setSelected([]);
		} else {
			setSelected(paginatedData.map(getItemId));
		}
	};		return (
			<div className="mt-4 w-full overflow-x-auto">
				{/* Custom toolbar - simplified without table dependency */}
				<div className="mb-4 p-4 border rounded-lg">
					<h4 className="font-semibold text-lg mb-2">Filter by Status</h4>
					<div className="flex gap-2 flex-wrap">
						{[
							"pending", "approved", "rejected", "cancelled","pending security","rejected by security"
						].map((status) => (
							<button
								key={status}
								onClick={() => setStatusFilter(status)}
								className={`capitalize px-4 py-2 rounded border ${
									statusFilter === status
										? "bg-primary text-primary-foreground"
										: "bg-background hover:bg-muted"
								}`}
							>
								{status.replace('pending security','pending sec.').replace('rejected by security','rejected sec.')}
							</button>
						))}
					</div>
				</div>
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
					<GenericTable
						data={paginatedData}
						columns={genericColumns}
						selected={selected}
						page={page}
						pageSize={pageSize}
						allChecked={selected.length === paginatedData.length && paginatedData.length > 0}
						getItemId={getItemId}
						getItemDisplayName={getItemDisplayName}
						onSelectItem={handleSelectItem}
						onSelectAll={handleSelectAll}
						noDataMessage={"No results."}
						isLoading={false}
						onPageChange={setPage}
						onPageSizeChange={setPageSize}
					/>
					<CustomPagination
						currentPage={page}
						totalPages={totalPages}
						onPageChange={setPage}
						pageSize={pageSize}
						pageSizeOptions={pageSizeOptions}
						onPageSizeChange={setPageSize}
					/>
				</div>
			</div>
		);
	}
