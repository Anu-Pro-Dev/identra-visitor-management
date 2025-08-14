"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { RegisterStepTwo } from "../schema/RegisterSchema";
import { User, Mail, Phone, Building2, Target, ChevronRight } from "lucide-react";

interface SecondStepProps {
  form: UseFormReturn<RegisterStepTwo>;
  onNext: () => void;
  onPrevious: () => void;
  isPending: boolean;
}

const containerVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function SecondStep({ form, onNext, onPrevious, isPending }: SecondStepProps) {
  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      onNext();
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">Visit Information</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Please provide your visit details and host information
        </p>
      </motion.div>

      <Form {...form}>
        <div className="space-y-4 sm:space-y-6">
          {/* Visit Information */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Visit Details</h3>
            
            <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4">
              <FormField
                control={form.control}
                name="visitType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                      <Building2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      Visit Type *
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary/50">
                          <SelectValue placeholder="Select visit type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="business">Business Meeting</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="delivery">Delivery</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                      <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                      Purpose of Visit *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe the purpose of your visit"
                        className="min-h-[60px] sm:min-h-[80px] text-sm sm:text-base border-2 focus:border-primary/50 transition-all duration-200 resize-none"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>

          {/* Host Information */}
          <motion.div variants={itemVariants} className="border-t pt-4 sm:pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Host Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <FormField
                control={form.control}
                name="hostName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      Host Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter host's full name"
                        className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary/50 transition-all duration-200"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hostEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                      Host Email *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter host's email address"
                        className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary/50 transition-all duration-200"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hostPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      Host Phone *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="Enter host's phone number"
                        className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary/50 transition-all duration-200"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-3 sm:pt-4"
          >
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              disabled={isPending}
              className="h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-medium order-2 sm:order-1"
            >
              Previous
            </Button>
            <Button
              type="button"
              onClick={handleNext}
              disabled={isPending}
              className="h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 transition-all duration-200 order-1 sm:order-2"
            >
              Next Step
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
            </Button>
          </motion.div>
        </div>
      </Form>
    </motion.div>
  );
}
