import { VisitorHistory } from "../types";

export const mockHistoryData: VisitorHistory[] = [
  {
    id: "1",
    visitorName: "Charles",
    company: "ABC Company",
    department: "Developer",
    purpose: "Meeting",
    hostName: "John Smith",
    visitDate: "2025-02-14",
    startTime: "10:00",
    endTime: "11:00",
    status: "In progress",
    duration: "1 Hrs",
    badge: "Regulatory Authority",
    avatars: [
      "https://i.pravatar.cc/40?img=1",
      "https://i.pravatar.cc/40?img=2",
      "https://i.pravatar.cc/40?img=3"
    ],
    checkInTime: "10:00 AM",
    notes: "Regular business meeting",
    createdAt: "2025-02-14T09:00:00Z",
    updatedAt: "2025-02-14T10:00:00Z"
  },
  {
    id: "2", 
    visitorName: "James Mathe",
    company: "ABC Company",
    department: "Developer",
    purpose: "Interview",
    hostName: "Sarah Johnson",
    visitDate: "2025-02-14",
    startTime: "10:00",
    endTime: "12:00",
    status: "Visited",
    duration: "1 Hrs",
    badge: "Vip",
    avatars: [
      "https://github.com/shadcn.png",
      "https://i.pravatar.cc/40?img=4",
      "https://i.pravatar.cc/40?img=5"
    ],
    checkInTime: "10:00 AM",
    checkOutTime: "12:00 PM",
    notes: "Technical interview completed successfully",
    createdAt: "2025-02-14T09:30:00Z",
    updatedAt: "2025-02-14T12:00:00Z"
  },
  {
    id: "3",
    visitorName: "John Micheal",
    company: "ABC Company", 
    department: "Developer",
    purpose: "Consultation",
    hostName: "Mike Wilson",
    visitDate: "2025-02-14",
    startTime: "12:00",
    endTime: "14:00",
    status: "Yet to arrive",
    duration: "1 Hrs",
    badge: "One time visitor",
    avatars: [
      "https://i.pravatar.cc/40?img=6",
      "https://i.pravatar.cc/40?img=7",
      "https://i.pravatar.cc/40?img=8"
    ],
    notes: "Scheduled consultation meeting",
    createdAt: "2025-02-14T08:00:00Z",
    updatedAt: "2025-02-14T08:00:00Z"
  },
  {
    id: "4",
    visitorName: "Emily Chen",
    company: "XYZ Corp",
    department: "Marketing",
    purpose: "Presentation",
    hostName: "David Brown",
    visitDate: "2025-02-13",
    startTime: "14:00",
    endTime: "16:00",
    status: "Visited",
    duration: "2 Hrs",
    badge: "Business Partner",
    avatars: [
      "https://i.pravatar.cc/40?img=9",
      "https://i.pravatar.cc/40?img=10"
    ],
    checkInTime: "14:00 PM",
    checkOutTime: "16:00 PM",
    notes: "Marketing presentation completed",
    createdAt: "2025-02-13T13:00:00Z",
    updatedAt: "2025-02-13T16:00:00Z"
  },
  {
    id: "5",
    visitorName: "Robert Taylor",
    company: "Tech Solutions",
    department: "Engineering",
    purpose: "Technical Review",
    hostName: "Lisa Anderson",
    visitDate: "2025-02-12",
    startTime: "09:00",
    endTime: "11:00",
    status: "Cancelled",
    duration: "2 Hrs",
    badge: "Contractor",
    avatars: [
      "https://i.pravatar.cc/40?img=11"
    ],
    notes: "Meeting cancelled due to technical issues",
    createdAt: "2025-02-12T08:00:00Z",
    updatedAt: "2025-02-12T08:30:00Z"
  }
];
