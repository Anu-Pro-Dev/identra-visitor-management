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

interface HistoryTableProps {
  data?: VisitorHistory[];
}

export default function HistoryTable({ data = mockHistoryData }: HistoryTableProps) {
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
    // Implement export functionality
    console.log("Exporting history data...");
  };

  const handleRefresh = () => {
    // Implement refresh functionality
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
            <CardTitle className="text-lg">Visitor History</CardTitle>
            <Badge variant="secondary">
              {filteredData.length} of {data.length} visits
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Visitor
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Visit Time
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Duration
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="h-24 text-center text-muted-foreground">
                        No visitors found.
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((visitor) => (
                      <tr key={visitor.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex -space-x-2">
                              {visitor.avatars.slice(0, 3).map((avatar, index) => (
                                <div
                                  key={index}
                                  className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium"
                                >
                                  {visitor.visitorName.charAt(0)}
                                </div>
                              ))}
                              {visitor.avatars.length > 3 && (
                                <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                                  +{visitor.avatars.length - 3}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-foreground">{visitor.visitorName}</div>
                              <div className="text-sm text-muted-foreground">
                                {visitor.company} • {visitor.department}
                              </div>
                              {visitor.badge && (
                                <Badge 
                                  variant="outline" 
                                  className="mt-1 text-xs bg-purple-100 text-purple-800 border-purple-200"
                                >
                                  • {visitor.badge}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">
                                {visitor.startTime} - {visitor.endTime}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(visitor.visitDate).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge 
                            variant="outline" 
                            className={`${
                              visitor.status === "In progress" ? "bg-blue-100 text-blue-800 border-blue-200" :
                              visitor.status === "Visited" ? "bg-green-100 text-green-800 border-green-200" :
                              visitor.status === "Yet to arrive" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                              visitor.status === "Cancelled" ? "bg-red-100 text-red-800 border-red-200" :
                              "bg-gray-100 text-gray-800 border-gray-200"
                            }`}
                          >
                            {visitor.status === "In progress" && <Clock className="h-3 w-3 mr-1" />}
                            {visitor.status === "Visited" && <UserCheck className="h-3 w-3 mr-1" />}
                            {visitor.status === "Yet to arrive" && <AlertCircle className="h-3 w-3 mr-1" />}
                            <span>{visitor.status}</span>
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="font-medium">{visitor.duration}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-sm text-blue-600 hover:text-blue-800">
                              View
                            </button>
                            <button className="text-sm text-gray-600 hover:text-gray-800">
                              Edit
                            </button>
                            <button className="text-sm text-green-600 hover:text-green-800">
                              Export
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
