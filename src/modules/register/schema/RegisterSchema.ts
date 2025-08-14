import { z } from "zod";

export const registerStepOneSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  
  // Identification
  idType: z.string().min(1, "ID type is required"),
  idNumber: z.string().min(5, "ID number is required"),
  attachIdCopy: z.any().optional(), // File input for ID copy
});

export const registerStepTwoSchema = z.object({
  // Visit Information
  visitType: z.string().min(1, "Visit type is required"),
  purpose: z.string().min(5, "Purpose of visit is required"),
  
  // Host Information
  hostName: z.string().min(2, "Host name is required"),
  hostEmail: z.string().email("Please enter a valid host email"),
  hostPhone: z.string().min(10, "Host phone number is required"),
});

export const registerStepThreeSchema = z.object({
  // Schedule
  visitDate: z.string().min(1, "Visit date is required"),
  visitTime: z.string().min(1, "Visit time is required"),
  duration: z.string().min(1, "Duration is required"),
  
  // Emergency Contact
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  emergencyContact: z.string().min(10, "Emergency contact is required"),
  
  // Requirements
  specialRequirements: z.string().optional(),
});

export const fullRegisterSchema = registerStepOneSchema
  .and(registerStepTwoSchema)
  .and(registerStepThreeSchema);

export type RegisterStepOne = z.infer<typeof registerStepOneSchema>;
export type RegisterStepTwo = z.infer<typeof registerStepTwoSchema>;
export type RegisterStepThree = z.infer<typeof registerStepThreeSchema>;
export type FullRegisterData = z.infer<typeof fullRegisterSchema>;
