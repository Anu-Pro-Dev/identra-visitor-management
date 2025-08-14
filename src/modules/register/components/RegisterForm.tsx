"use client";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LogoIcon } from "@/components/common/svg/icons";
import { StepsHeader } from "./StepsHeader";
import { FirstStep } from "./FirstStep";
import { SecondStep } from "./SecondStep";
import { ThirdStep } from "./ThirdStep";
import { useMultiStepForm } from "../hooks/useMultiStepForm";

const pageVariants = {
  initial: { opacity: 0, scale: 0.8 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 1.2 }
};

const pageTransition = {
  type: "tween" as const,
  ease: "anticipate" as const,
  duration: 0.5
};

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    currentStep,
    totalSteps,
    isPending,
    stepOneForm,
    stepTwoForm,
    stepThreeForm,
    nextStep,
    previousStep,
    submitForm,
    goToStep,
  } = useMultiStepForm();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FirstStep
            key="step1"
            form={stepOneForm}
            onNext={nextStep}
            isPending={isPending}
          />
        );
      case 2:
        return (
          <SecondStep
            key="step2"
            form={stepTwoForm}
            onNext={nextStep}
            onPrevious={previousStep}
            isPending={isPending}
          />
        );
      case 3:
        return (
          <ThirdStep
            key="step3"
            form={stepThreeForm}
            onPrevious={previousStep}
            onSubmit={submitForm}
            isPending={isPending}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-8", className)}
      {...props}
    >
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full border-0 shadow-none">
        <CardHeader className="text-center pb-4 sm:pb-6 pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-primary/10"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <LogoIcon />
          </motion.div>
          <motion.div
            className="mb-3 sm:mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-1 sm:mb-2">
              <span className="text-foreground text-lg sm:text-xl lg:text-2xl font-bold">Register for </span>
              <span className="text-primary text-lg sm:text-xl lg:text-2xl font-bold">Identra</span>
            </div>
            <h1 className="text-sm sm:text-base lg:text-lg font-medium text-muted-foreground">
              Visitor Management System
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full flex items-center justify-center"
          >
            <StepsHeader 
              currentStep={currentStep} 
              totalSteps={totalSteps} 
              onStepClick={goToStep}
            />
          </motion.div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
          <AnimatePresence mode="wait">
            {renderCurrentStep()}
          </AnimatePresence>
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
}
