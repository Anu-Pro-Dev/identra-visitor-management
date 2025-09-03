import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  registerStepOneSchema,
  registerStepTwoSchema,
  registerStepThreeSchema,
  RegisterStepOne,
  RegisterStepTwo,
  RegisterStepThree,
  FullRegisterData,
} from "../schema/RegisterSchema";

export function useMultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState<Partial<FullRegisterData>>({});
  const router = useRouter();

  const stepOneForm = useForm<RegisterStepOne>({
    resolver: zodResolver(registerStepOneSchema),
    defaultValues: formData as RegisterStepOne,
  });

  const stepTwoForm = useForm<RegisterStepTwo>({
    resolver: zodResolver(registerStepTwoSchema),
    defaultValues: formData as RegisterStepTwo,
  });

  const stepThreeForm = useForm<RegisterStepThree>({
    resolver: zodResolver(registerStepThreeSchema),
    defaultValues: formData as RegisterStepThree,
  });

  const totalSteps = 3;

  const getCurrentForm = () => {
    switch (currentStep) {
      case 1:
        return stepOneForm;
      case 2:
        return stepTwoForm;
      case 3:
        return stepThreeForm;
      default:
        return stepOneForm;
    }
  };

  const getCurrentStepData = () => {
    switch (currentStep) {
      case 1:
        return stepOneForm.getValues();
      case 2:
        return stepTwoForm.getValues();
      case 3:
        return stepThreeForm.getValues();
      default:
        return {};
    }
  };

  const nextStep = async () => {
    const currentForm = getCurrentForm();
    const isValid = await currentForm.trigger();
    
    if (isValid) {
      const currentData = getCurrentStepData();
      setFormData(prev => ({ ...prev, ...currentData }));
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const previousStep = () => {
    const currentData = getCurrentStepData();
    setFormData(prev => ({ ...prev, ...currentData }));
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const submitForm = async () => {
    const finalData = {
      ...formData,
      ...stepThreeForm.getValues(),
    } as FullRegisterData;

    setIsPending(true);
    
    try {
      console.log("Registration data:", finalData);
      // Here you would typically send the data to your API
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Registration successful");
      toast.success("Registration successful! Redirecting...");
      
      // Redirect to login page
      setTimeout(() => {
        router.push("/");
      }, 1000);
      
      setIsPending(false);
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
      setIsPending(false);
      return false;
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      const currentData = getCurrentStepData();
      setFormData(prev => ({ ...prev, ...currentData }));
      setCurrentStep(step);
    }
  };

  return {
    currentStep,
    totalSteps,
    isPending,
    formData,
    stepOneForm,
    stepTwoForm,
    stepThreeForm,
    getCurrentForm,
    nextStep,
    previousStep,
    submitForm,
    goToStep,
    setIsPending,
  };
}
