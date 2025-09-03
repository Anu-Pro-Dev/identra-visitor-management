import { z } from "zod";

// Schema for registering a scheduled visitor (approved meeting)
export const scheduledVisitorRegistrationSchema = z.object({
  meetingId: z.string().min(1, "Meeting ID is required"),
  visitorId: z.string().min(1, "Visitor ID is required"),
  idCardData: z.object({
    name: z.string().min(1, "Name is required"),
    idNumber: z.string().min(1, "ID number is required"),
    photo: z.string().optional(), // Base64 photo data
    address: z.string().optional(),
    dateOfBirth: z.string().optional(),
    nationality: z.string().optional(),
  }),
  badgeData: z.object({
    badgeNumber: z.string().min(1, "Badge number is required"),
    qrCode: z.string().min(1, "QR code is required"),
    accessLevel: z.string().min(1, "Access level is required"),
    validFrom: z.string().min(1, "Valid from date is required"),
    validTo: z.string().min(1, "Valid to date is required"),
  }),
  checkInTime: z.string().min(1, "Check-in time is required"),
  securityNotes: z.string().optional(),
});

// Schema for unscheduled visitor registration
export const unscheduledVisitorRegistrationSchema = z.object({
  // Visitor Information
  visitorName: z.string().min(2, "Visitor name is required"),
  companyName: z.string().min(2, "Company name is required"),
  idNumber: z.string().min(1, "ID number is required"),
  mobileNumber: z.string().min(10, "Mobile number is required"),
  emailAddress: z.string().email("Valid email is required"),
  
  // Host Information
  hostId: z.string().min(1, "Host selection is required"),
  hostName: z.string().min(1, "Host name is required"),
  hostEmail: z.string().email("Host email is required"),
  hostDepartment: z.string().min(1, "Host department is required"),
  
  // Visit Information
  visitTime: z.string().min(1, "Visit time is required"),
  proposedDuration: z.string().min(1, "Duration is required"),
  reasonForVisit: z.string().min(10, "Reason for visit is required"),
  accessRequiredTo: z.string().min(1, "Access requirement is required"),
  visitorRole: z.string().min(1, "Visitor role is required"),
  
  // Multiple visitors
  numberOfVisitors: z.number().min(1).max(20),
  additionalVisitors: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    mobileNumber: z.string().min(10, "Mobile number is required"),
    idNumber: z.string().min(1, "ID number is required"),
  })).optional(),
  
  // ID Card scanning data (auto-captured)
  idCardData: z.object({
    name: z.string().min(1, "Name is required"),
    idNumber: z.string().min(1, "ID number is required"),
    photo: z.string().optional(),
    address: z.string().optional(),
    dateOfBirth: z.string().optional(),
    nationality: z.string().optional(),
  }),
  
  // Badge information
  badgeData: z.object({
    badgeNumber: z.string().min(1, "Badge number is required"),
    qrCode: z.string().min(1, "QR code is required"),
    accessLevel: z.string().min(1, "Access level is required"),
    validFrom: z.string().min(1, "Valid from date is required"),
    validTo: z.string().min(1, "Valid to date is required"),
  }),
  
  // Additional information
  securityNotes: z.string().optional(),
});

export type ScheduledVisitorRegistration = z.infer<typeof scheduledVisitorRegistrationSchema>;
export type UnscheduledVisitorRegistration = z.infer<typeof unscheduledVisitorRegistrationSchema>;

// Mock data for hosts and departments
export const departments = [
  "Executive Management",
  "Human Resources",
  "Information Technology", 
  "Finance & Accounting",
  "Marketing & Sales",
  "Operations",
  "Research & Development",
  "Customer Service",
  "Legal & Compliance",
  "Facilities Management"
];

export const mockHosts = [
  {
    id: "host-1",
    name: "John Smith",
    email: "john.smith@company.com",
    department: "Information Technology",
    position: "IT Director"
  },
  {
    id: "host-2", 
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    department: "Human Resources",
    position: "HR Manager"
  },
  {
    id: "host-3",
    name: "Michael Brown",
    email: "michael.brown@company.com",
    department: "Finance & Accounting", 
    position: "Finance Director"
  },
  {
    id: "host-4",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    department: "Marketing & Sales",
    position: "Marketing Manager"
  },
  {
    id: "host-5",
    name: "Robert Wilson",
    email: "robert.wilson@company.com",
    department: "Executive Management",
    position: "CEO"
  },
  {
    id: "host-6",
    name: "Lisa Anderson",
    email: "lisa.anderson@company.com",
    department: "Operations",
    position: "Operations Manager"
  }
];

// Access levels for badge generation
export const accessLevels = [
  "Visitor - Ground Floor Only",
  "Visitor - Ground & 1st Floor",
  "Visitor - All Public Areas",
  "Contractor - Designated Areas",
  "VIP - Executive Areas",
  "Delivery - Loading Dock Only"
];

// Badge template configuration
export interface BadgeTemplate {
  backgroundColor: string;
  textColor: string;
  logoUrl?: string;
  qrCodeSize: number;
  photoSize: { width: number; height: number };
}

export const defaultBadgeTemplate: BadgeTemplate = {
  backgroundColor: "#ffffff",
  textColor: "#000000",
  qrCodeSize: 80,
  photoSize: { width: 100, height: 120 }
};
