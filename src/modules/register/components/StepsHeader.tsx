"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepsHeaderProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

const steps = [
  { id: 1, name: "Personal Info", description: "Basic information" },
  { id: 2, name: "Visit Details", description: "Organization & purpose" },
  { id: 3, name: "Schedule", description: "Date & time preferences" },
];

export function StepsHeader({
  currentStep,
  totalSteps,
  onStepClick,
}: StepsHeaderProps) {
  return (
    <div className="w-full mb-4 sm:mb-6 lg:mb-8 flex">
      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center w-fit">
              <motion.div
                className={cn(
                  "w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium cursor-pointer transition-all duration-200",
                  currentStep > step.id
                    ? "bg-primary text-primary-foreground"
                    : currentStep === step.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
                onClick={() => onStepClick?.(step.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {currentStep > step.id ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                  </motion.div>
                ) : (
                  step.id
                )}
              </motion.div>
              <motion.div
                className="mt-1 sm:mt-2 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.1 }}
              >
                <p
                  className={cn(
                    "text-xs sm:text-sm font-medium transition-colors duration-200 hidden sm:block",
                    currentStep >= step.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.name}
                </p>
                <p className="text-xs text-muted-foreground hidden md:block text-nowrap">
                  {step.description}
                </p>
              </motion.div>
            </div>
            {index < steps.length - 1 && (
              <motion.div
                className={cn(
                  "flex-1 h-px mx-2 sm:mx-3 lg:mx-4 transition-all duration-500",
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                )}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
