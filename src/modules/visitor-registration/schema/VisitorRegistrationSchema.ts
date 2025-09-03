import { z } from "zod";

// File validation schema
const fileSchema = z
  .any()
  .refine((file) => {
    if (!file) return false;
    return file instanceof File;
  }, "Please select a file")
  .refine((file) => {
    if (!file) return false;
    return file.size <= 2 * 1024 * 1024; // 2MB limit
  }, "File size must be less than 2MB")
  .refine((file) => {
    if (!file) return false;
    return file.type === "application/pdf";
  }, "File must be a PDF");

// Main visitor registration schema
export const visitorRegistrationSchema = z.object({
  // Host Information (pre-filled from URL params)
  hostName: z.string().min(1, "Host name is required"),
  hostId: z.string().optional(),
  
  // Visitor Basic Information
  visitorName: z.string().min(2, "Visitor name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  
  // Identification
  idNumber: z.string().min(5, "ID number is required"),
  passportNumber: z.string().optional(),
  attachIdCopy: fileSchema,
  
  // Contact Information
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
  emailAddress: z.string().email("Please enter a valid email address"),
  
  // Visit Schedule
  proposedVisitDate: z.string().min(1, "Visit date is required"),
  proposedVisitTime: z.string().min(1, "Visit time is required"),
  proposedDuration: z.string().min(1, "Duration is required"),
  
  // Visit Details
  reasonForVisit: z.string()
    .min(10, "Reason for visit must be at least 10 characters")
    .max(200, "Reason for visit cannot exceed 200 characters"),
  accessRequiredTo: z.string().min(1, "Access requirement is required"),
  visitorRole: z.string().min(1, "Visitor role is required"),
  
  // Multiple Visitors
  numberOfVisitors: z.number().min(1, "Number of visitors must be at least 1").max(20, "Cannot exceed 20 visitors"),
  additionalVisitors: z.array(z.object({
    name: z.string().min(2, "Visitor name is required"),
    mobileNumber: z.string().min(10, "Mobile number is required"),
    idNumber: z.string().min(5, "ID number is required"),
  })).optional(),
  
  // Additional Notes
  notes: z.string().optional(),
});

export type VisitorRegistrationData = z.infer<typeof visitorRegistrationSchema>;

// Time interval options (30-minute intervals)
export const timeIntervals = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00"
];

// Duration options (30 minutes to 10 hours)
export const durationOptions = [
  { value: "0.5", label: "30 minutes" },
  { value: "1", label: "1 hour" },
  { value: "1.5", label: "1.5 hours" },
  { value: "2", label: "2 hours" },
  { value: "2.5", label: "2.5 hours" },
  { value: "3", label: "3 hours" },
  { value: "3.5", label: "3.5 hours" },
  { value: "4", label: "4 hours" },
  { value: "4.5", label: "4.5 hours" },
  { value: "5", label: "5 hours" },
  { value: "5.5", label: "5.5 hours" },
  { value: "6", label: "6 hours" },
  { value: "6.5", label: "6.5 hours" },
  { value: "7", label: "7 hours" },
  { value: "7.5", label: "7.5 hours" },
  { value: "8", label: "8 hours" },
  { value: "8.5", label: "8.5 hours" },
  { value: "9", label: "9 hours" },
  { value: "9.5", label: "9.5 hours" },
  { value: "10", label: "10 hours" },
];

// Access requirements (configurable dropdown options)
export const accessRequirements = [
  "Office Building",
  "Conference Room A",
  "Conference Room B",
  "Meeting Room 1",
  "Meeting Room 2",
  "Executive Floor",
  "IT Department",
  "HR Department",
  "Finance Department",
  "Manufacturing Floor",
  "Warehouse",
  "Parking Area",
];

// Visitor role options (configurable dropdown)
export const visitorRoles = [
  "Client",
  "Vendor/Supplier",
  "Contractor",
  "Consultant",
  "Job Candidate",
  "Government Official",
  "Auditor",
  "Delivery Person",
  "Maintenance Staff",
  "Guest Speaker",
  "Training Facilitator",
  "Other",
];
