"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { RegisterStepOne } from "../schema/RegisterSchema";
import { User, Mail, Phone, CreditCard, Hash, Upload, ChevronRight } from "lucide-react";

interface FirstStepProps {
  form: UseFormReturn<RegisterStepOne>;
  onNext: () => void;
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

export function FirstStep({ form, onNext, isPending }: FirstStepProps) {
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
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">Personal Information</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Please provide your basic information and identification details
        </p>
      </motion.div>

      <Form {...form}>
        <div className="space-y-4 sm:space-y-6">
          {/* Personal Information */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Basic Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      First Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your first name"
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      Last Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your last name"
                        className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary/50 transition-all duration-200"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                      Email Address *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email address"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      Phone Number *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="Enter your phone number"
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

          {/* Identification Section */}
          <motion.div variants={itemVariants} className="border-t pt-4 sm:pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Identification</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
              <FormField
                control={form.control}
                name="idType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                      <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
                      ID Type *
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary/50">
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="drivers-license">Driver's License</SelectItem>
                        <SelectItem value="national-id">National ID</SelectItem>
                        <SelectItem value="employee-id">Employee ID</SelectItem>
                        <SelectItem value="student-id">Student ID</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                      <Hash className="w-3 h-3 sm:w-4 sm:h-4" />
                      ID Number *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your ID number"
                        className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary/50 transition-all duration-200"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="attachIdCopy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                    <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
                    Attach ID Copy
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        className="h-12 sm:h-14 text-sm sm:text-base border-2 border-dashed border-gray-300 hover:border-primary/50 focus:border-primary transition-all duration-200 rounded-lg bg-gray-50/50 hover:bg-gray-50 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-primary file:text-primary-foreground file:rounded file:text-sm file:font-medium file:cursor-pointer cursor-pointer"
                        disabled={isPending}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-muted-foreground text-sm">
                        <span className="bg-background px-2 rounded">
                          {field.value ? field.value.name : "Choose file or drag & drop"}
                        </span>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs sm:text-sm text-muted-foreground">
                    Upload a clear copy of your ID (JPG, PNG, or PDF, max 5MB)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex justify-end pt-3 sm:pt-4"
          >
            <Button
              type="button"
              onClick={handleNext}
              disabled={isPending}
              className="h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 transition-all duration-200"
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
