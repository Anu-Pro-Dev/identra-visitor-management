"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Calendar as CalendarIcon, 
  Filter, 
  X,
  Download,
  RefreshCw
} from "lucide-react";
import { format } from "date-fns";

interface HistoryFiltersProps {
  onSearchChange: (search: string) => void;
  onStatusChange: (status: string) => void;
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void;
  onDepartmentChange: (department: string) => void;
  onClearFilters: () => void;
  onExport: () => void;
  onRefresh: () => void;
}

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "in-progress", label: "In Progress" },
  { value: "visited", label: "Visited" },
  { value: "yet-to-arrive", label: "Yet to Arrive" },
  { value: "cancelled", label: "Cancelled" },
  { value: "no-show", label: "No Show" },
];

const departmentOptions = [
  { value: "all", label: "All Departments" },
  { value: "sales", label: "Sales" },
  { value: "hr", label: "Human Resources" },
  { value: "it", label: "Information Technology" },
  { value: "finance", label: "Finance" },
  { value: "operations", label: "Operations" },
  { value: "marketing", label: "Marketing" },
];

export default function HistoryFilters({
  onSearchChange,
  onStatusChange,
  onDateRangeChange,
  onDepartmentChange,
  onClearFilters,
  onExport,
  onRefresh,
}: HistoryFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    onStatusChange(value);
  };

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    onDepartmentChange(value);
  };

  const handleStartDateChange = (date: Date | undefined) => {
    const newDate = date || null;
    setStartDate(newDate);
    onDateRangeChange(newDate, endDate);
  };

  const handleEndDateChange = (date: Date | undefined) => {
    const newDate = date || null;
    setEndDate(newDate);
    onDateRangeChange(startDate, newDate);
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedStatus("all");
    setSelectedDepartment("all");
    setStartDate(null);
    setEndDate(null);
    onClearFilters();
  };

  const hasActiveFilters = 
    search !== "" || 
    selectedStatus !== "all" || 
    selectedDepartment !== "all" || 
    startDate !== null || 
    endDate !== null;

  return (
    <div className="space-y-4">
      {/* Search and Quick Actions Row */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search visitors..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            className="flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        {/* Status Filter */}
        <Select value={selectedStatus} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Department Filter */}
        <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            {departmentOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date Range Picker */}
        <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-60 justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate && endDate ? (
                `${format(startDate, "MMM dd")} - ${format(endDate, "MMM dd, yyyy")}`
              ) : startDate ? (
                `${format(startDate, "MMM dd, yyyy")} - Select end`
              ) : (
                "Select date range"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Start Date</label>
                <Calendar
                  mode="single"
                  selected={startDate || undefined}
                  onSelect={handleStartDateChange}
                  initialFocus
                />
              </div>
              {startDate && (
                <div>
                  <label className="text-sm font-medium mb-2 block">End Date</label>
                  <Calendar
                    mode="single"
                    selected={endDate || undefined}
                    onSelect={handleEndDateChange}
                    disabled={(date) => date < startDate}
                  />
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setStartDate(null);
                    setEndDate(null);
                    onDateRangeChange(null, null);
                    setIsDatePickerOpen(false);
                  }}
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  onClick={() => setIsDatePickerOpen(false)}
                  disabled={!startDate}
                >
                  Done
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="flex items-center space-x-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            <span>Clear all</span>
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center space-x-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {search && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Search: {search}</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleSearchChange("")}
              />
            </Badge>
          )}
          
          {selectedStatus !== "all" && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Status: {statusOptions.find(s => s.value === selectedStatus)?.label}</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleStatusChange("all")}
              />
            </Badge>
          )}
          
          {selectedDepartment !== "all" && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Dept: {departmentOptions.find(d => d.value === selectedDepartment)?.label}</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleDepartmentChange("all")}
              />
            </Badge>
          )}
          
          {(startDate || endDate) && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>
                Date: {startDate ? format(startDate, "MMM dd") : "Start"} - {endDate ? format(endDate, "MMM dd") : "End"}
              </span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                  onDateRangeChange(null, null);
                }}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
