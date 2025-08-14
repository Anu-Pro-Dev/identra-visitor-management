
"use client";
import { Table } from "@tanstack/react-table";
import { Funnel } from "lucide-react";
import { FiCheckCircle } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	statusFilter: string;
	setStatusFilter: (status: string) => void;
}

export function DataTableToolbar<TData>({
	table,
	statusFilter,
	setStatusFilter,
}: DataTableToolbarProps<TData>) {
	const [formData, setFormData] = useState({
		selectedTime: null,
		selectedDuration: null,
		reason: "",
	});

	const [errors, setErrors] = useState({
		selectedTime: "",
		selectedDuration: "",
		reason: "",
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<>
			{/* Alerts and dialogs omitted for brevity, copy from reference if needed */}
			   <div className="flex items-center justify-between">
				   <div className="flex flex-col gap-1 pb-8">
					   <p className="text-foreground text-2xl font-bold">Approvals</p>
					   <p className="font-semibold text-muted-foreground">Approvals</p>
				   </div>
				   <div className="flex items-center space-x-2">
					   <Input
						   placeholder="Search employee,updates.."
						   value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
						   onChange={(event) =>
							   table.getColumn("name")?.setFilterValue(event.target.value)
						   }
						   className="h-8 w-[150px] lg:w-[350px] px-2 text-[12px] text-muted-foreground rounded-full bg-background border border-border"
					   />
					   <Button className="h-8 px-2 bg-primary text-primary-foreground">
						   <Funnel />
						   Filter
					   </Button>
					   {![
						   "rejected",
						   "cancelled",
						   "pending security",
						   "rejected by security",
					   ].includes(statusFilter) && (
						   <Button className="h-8 px-2 bg-primary text-primary-foreground">
							   <FiCheckCircle />
							   Verify
						   </Button>
					   )}
				   </div>
			   </div>
		</>
	);
}
