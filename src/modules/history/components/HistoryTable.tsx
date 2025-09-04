"use client";

import { useState, useMemo } from "react";
import HistoryFilters from "./HistoryFilters";
import { mockHistoryData } from "../data/mockData";
import { VisitorHistory } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  UserCheck, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Calendar
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { GenericTable, TableColumn } from "@/components/common/GenericTable";
import { CustomPagination } from "@/components/common/Pagination";

interface HistoryTableProps {
  data?: VisitorHistory[];
}

export default function HistoryTable({ data = mockHistoryData }: HistoryTableProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return data.filter((visitor) => {
      // Search filter
      const matchesSearch = searchTerm === "" || 
        visitor.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.department.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === "all" || 
        visitor.status.toLowerCase().replace(" ", "-") === statusFilter;

      // Department filter
      const matchesDepartment = departmentFilter === "all" || 
        visitor.department.toLowerCase() === departmentFilter;

      // Date range filter
      const visitDate = new Date(visitor.visitDate);
      const matchesDateRange = (!startDate || visitDate >= startDate) && 
        (!endDate || visitDate <= endDate);

      return matchesSearch && matchesStatus && matchesDepartment && matchesDateRange;
    });
  }, [data, searchTerm, statusFilter, departmentFilter, startDate, endDate]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredData.length;
    const visited = filteredData.filter(v => v.status === "Visited").length;
    const inProgress = filteredData.filter(v => v.status === "In progress").length;
    const yetToArrive = filteredData.filter(v => v.status === "Yet to arrive").length;
    const cancelled = filteredData.filter(v => v.status === "Cancelled").length;
    const noShow = filteredData.filter(v => v.status === "No show").length;

    const visitedRate = total > 0 ? Math.round((visited / total) * 100) : 0;

    return {
      total,
      visited,
      inProgress,
      yetToArrive,
      cancelled,
      noShow,
      visitedRate
    };
  }, [filteredData]);

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageSizeOptions = [10, 20, 50, 100];
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Table columns for GenericTable
  const genericColumns: TableColumn<any>[] = [
    {
      key: "visitorName",
      header: t("common.visitor") || "Visitor",
      accessor: (item) => item.visitorName,
    },
    {
      key: "visitTime",
      header: t("common.visitTime") || "Visit Time",
      accessor: (item) => `${item.startTime} - ${item.endTime}`,
    },
    {
      key: "status",
      header: t("common.status") || "Status",
      accessor: (item) => item.status,
    },
    {
      key: "duration",
      header: t("common.duration") || "Duration",
      accessor: (item) => item.duration,
    },
  ];

  // Selection logic
  const [selected, setSelected] = useState<Array<string | number>>([]);
  const getItemId = (item: any) => item.id;
  const getItemDisplayName = (item: any) => item.visitorName;
  const handleSelectItem = (id: string | number) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  const handleSelectAll = () => {
    if (selected.length === paginatedData.length) {
      setSelected([]);
    } else {
      setSelected(paginatedData.map(getItemId));
    }
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleDepartmentChange = (department: string) => {
    setDepartmentFilter(department);
  };

  const handleDateRangeChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDepartmentFilter("all");
    setStartDate(null);
    setEndDate(null);
  };

  const handleExport = () => {
    console.log("Exporting history data...");
  };

  const handleRefresh = () => {
    console.log("Refreshing history data...");
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              All scheduled visits
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.visited}</div>
            <p className="text-xs text-muted-foreground">
              Successfully visited
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">
              Currently visiting
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.yetToArrive}</div>
            <p className="text-xs text-muted-foreground">
              Yet to arrive
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visit Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.visitedRate}%</div>
            <p className="text-xs text-muted-foreground">
              Completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues</CardTitle>
            <Calendar className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.cancelled + stats.noShow}</div>
            <p className="text-xs text-muted-foreground">
              Cancelled + No shows
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <UserCheck className="h-3 w-3 mr-1" />
              Visited: {stats.visited}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Clock className="h-3 w-3 mr-1" />
              In Progress: {stats.inProgress}
            </Badge>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              <AlertCircle className="h-3 w-3 mr-1" />
              Yet to Arrive: {stats.yetToArrive}
            </Badge>
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              Cancelled: {stats.cancelled}
            </Badge>
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
              No Show: {stats.noShow}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <HistoryFilters
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onDateRangeChange={handleDateRangeChange}
        onDepartmentChange={handleDepartmentChange}
        onClearFilters={handleClearFilters}
        onExport={handleExport}
        onRefresh={handleRefresh}
      />

      {/* Data Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{t("common.visitorHistory") || "Visitor History"}</CardTitle>
            <Badge variant="secondary">
              {filteredData.length} of {data.length} {t("common.visits") || "visits"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
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
            noDataMessage={t("common.noResults") || "No results."}
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
        </CardContent>
      </Card>
    </div>
  );
}
