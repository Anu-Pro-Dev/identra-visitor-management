export interface VisitorHistory {
  id: string;
  visitorName: string;
  company: string;
  department: string;
  purpose: string;
  hostName: string;
  visitDate: string;
  startTime: string;
  endTime: string;
  status: "In progress" | "Visited" | "Yet to arrive" | "Cancelled" | "No show";
  duration: string;
  badge?: string;
  avatars: string[];
  checkInTime?: string;
  checkOutTime?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HistoryFilters {
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  company?: string;
  host?: string;
  search?: string;
}

export type HistoryStatusType = "In progress" | "Visited" | "Yet to arrive" | "Cancelled" | "No show";
