export interface StepProps {
  onNext?: () => void;
  onPrevious?: () => void;
  onSubmit?: () => void;
  isPending: boolean;
}

export interface RegisterFormData {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Step 2
  organization: string;
  department: string;
  purpose: string;
  hostName: string;
  hostEmail: string;
  
  // Step 3
  visitDate: string;
  visitTime: string;
  duration: string;
  specialRequirements?: string;
  emergencyContact: string;
  emergencyContactName: string;
}

export interface FormStep {
  id: number;
  name: string;
  description: string;
  component: React.ComponentType<any>;
}
