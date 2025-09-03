"use client";

import { ColumnDef } from "@tanstack/react-table";
import { VisitorHistory } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Clock, CheckCircle, AlertCircle, XCircle, Ban } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "In progress":
      return <Clock className="h-4 w-4" />;
    case "Visited":
      return <CheckCircle className="h-4 w-4" />;
    case "Yet to arrive":
      return <AlertCircle className="h-4 w-4" />;
    case "Cancelled":
      return <XCircle className="h-4 w-4" />;
    case "No show":
      return <Ban className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "In progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Visited":
      return "bg-green-100 text-green-800 border-green-200";
    case "Yet to arrive":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    case "No show":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case "Vip":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Regulatory Authority":
      return "bg-red-100 text-red-800 border-red-200";
    case "One time visitor":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Business Partner":
      return "bg-green-100 text-green-800 border-green-200";
    case "Contractor":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const historyColumns: ColumnDef<VisitorHistory>[] = [
  {
    accessorKey: "visitorName",
    header: "Visitor",
    cell: ({ row }) => {
      const visitor = row.original;
      return (
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            {visitor.avatars.slice(0, 3).map((avatar, index) => (
              <Avatar key={index} className="h-8 w-8 border-2 border-background">
                <AvatarImage src={avatar} />
                <AvatarFallback>
                  {visitor.visitorName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
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
                className={`mt-1 text-xs ${getBadgeColor(visitor.badge)}`}
              >
                • {visitor.badge}
              </Badge>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "visitTime",
    header: "Visit Time",
    cell: ({ row }) => {
      const visitor = row.original;
      return (
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="font-medium">
              {visitor.startTime} - {visitor.endTime}
            </div>
            <div className="text-sm text-muted-foreground">
              {format(new Date(visitor.visitDate), "MMM dd, yyyy")}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge 
          variant="outline" 
          className={`${getStatusColor(status)}`}
        >
          {getStatusIcon(status)}
          <span className="ml-1">{status}</span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const duration = row.getValue("duration") as string;
      return (
        <div className="font-medium">{duration}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const visitor = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log("View details", visitor.id)}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Edit visitor", visitor.id)}>
              Edit Visit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Export", visitor.id)}>
              Export Data
            </DropdownMenuItem>
            {visitor.status === "Yet to arrive" && (
              <DropdownMenuItem onClick={() => console.log("Cancel visit", visitor.id)}>
                Cancel Visit
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
