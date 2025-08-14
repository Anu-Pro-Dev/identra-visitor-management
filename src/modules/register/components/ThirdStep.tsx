"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { RegisterStepThree } from "../schema/RegisterSchema";
import { CalendarIcon, Clock, Timer, User, Phone, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface ThirdStepProps {
  form: UseFormReturn<RegisterStepThree>;
  onPrevious: () => void;
  onSubmit: () => void;
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

export function ThirdStep({ form, onPrevious, onSubmit, isPending }: ThirdStepProps) {
  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      onSubmit();
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
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">Schedule Your Visit</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Please provide your visit schedule and emergency contact information
        </p>
      </motion.div>

      <Form {...form}>
        <div className="space-y-4 sm:space-y-6">
          {/* Schedule Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Visit Schedule</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
              <FormField
                control={form.control}
                name="visitDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                      <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      Visit Date *
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                            <Button
                              variant="outline"
                              className={`h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary/50 transition-all duration-200 w-full justify-start text-left font-normal ${
                                !field.value && "text-muted-foreground"
                              }`}
                              disabled={isPending}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </motion.div>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </motion.div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visitTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      Visit Time *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="time"
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
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                    <Timer className="w-3 h-3 sm:w-4 sm:h-4" />
                    Expected Duration *
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary/50">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="30min">30 minutes</SelectItem>
                      <SelectItem value="1hour">1 hour</SelectItem>
                      <SelectItem value="2hours">2 hours</SelectItem>
                      <SelectItem value="3hours">3 hours</SelectItem>
                      <SelectItem value="half-day">Half day (4 hours)</SelectItem>
                      <SelectItem value="full-day">Full day (8 hours)</SelectItem>
                      <SelectItem value="multiple-days">Multiple days</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* Emergency Contact */}
          <motion.div variants={itemVariants} className="border-t pt-4 sm:pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Emergency Contact</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <FormField
                control={form.control}
                name="emergencyContactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      Contact Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Emergency contact name"
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
                name="emergencyContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      Contact Number *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="Emergency contact number"
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

          {/* Special Requirements */}
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="specialRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    Special Requirements
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Any special requirements or accessibility needs"
                      className="min-h-[60px] sm:min-h-[80px] text-sm sm:text-base border-2 focus:border-primary/50 transition-all duration-200 resize-none"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              onClick={handleSubmit}
              disabled={isPending}
              className="h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 transition-all duration-200 order-1 sm:order-2"
            >
              {isPending ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : null}
              {isPending ? "Submitting..." : "Submit Registration"}
            </Button>
          </motion.div>
        </div>
      </Form>
    </motion.div>
  );
}
