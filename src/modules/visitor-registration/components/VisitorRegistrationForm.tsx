"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon, Upload, Plus, Trash2, CheckCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { LogoIcon } from "@/components/common/svg/icons";

import {
  visitorRegistrationSchema,
  VisitorRegistrationData,
  timeIntervals,
  durationOptions,
  accessRequirements,
  visitorRoles,
} from "../schema/VisitorRegistrationSchema";
import { emailService } from "@/services/emailNotification";

interface VisitorRegistrationFormProps {
  hostName?: string;
  hostId?: string;
}

export function VisitorRegistrationForm({
  hostName = "",
  hostId = "",
}: VisitorRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [additionalVisitors, setAdditionalVisitors] = useState<Array<{
    id: string;
    name: string;
    mobileNumber: string;
    idNumber: string;
  }>>([]);

  const form = useForm<VisitorRegistrationData>({
    resolver: zodResolver(visitorRegistrationSchema),
    defaultValues: {
      hostName,
      hostId,
      numberOfVisitors: 1,
      additionalVisitors: [],
    },
  });

  const numberOfVisitors = form.watch("numberOfVisitors");

  // Add additional visitor
  const addAdditionalVisitor = () => {
    const newVisitor = {
      id: Date.now().toString(),
      name: "",
      mobileNumber: "",
      idNumber: "",
    };
    setAdditionalVisitors([...additionalVisitors, newVisitor]);
  };

  // Remove additional visitor
  const removeAdditionalVisitor = (id: string) => {
    setAdditionalVisitors(additionalVisitors.filter(v => v.id !== id));
  };

  // Handle number of visitors change
  React.useEffect(() => {
    const currentCount = additionalVisitors.length + 1;
    if (numberOfVisitors > currentCount) {
      // Add more visitors
      const toAdd = numberOfVisitors - currentCount;
      for (let i = 0; i < toAdd; i++) {
        addAdditionalVisitor();
      }
    } else if (numberOfVisitors < currentCount) {
      // Remove excess visitors
      const toRemove = currentCount - numberOfVisitors;
      const newAdditionalVisitors = additionalVisitors.slice(0, -toRemove);
      setAdditionalVisitors(newAdditionalVisitors);
    }
  }, [numberOfVisitors]);

  const onSubmit = async (data: VisitorRegistrationData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Visitor Registration Data:", data);
      console.log("Additional Visitors:", additionalVisitors);
      
      // Send email notifications
      await emailService.sendVisitorRegistrationNotification({
        visitorEmail: data.emailAddress,
        hostEmail: `${data.hostName.toLowerCase().replace(/\s+/g, '.')}@company.com`, // Simulated host email
        visitorName: data.visitorName,
        hostName: data.hostName,
        companyName: data.companyName,
        visitDate: format(new Date(data.proposedVisitDate), "PPP"),
        visitTime: data.proposedVisitTime,
        duration: durationOptions.find(d => d.value === data.proposedDuration)?.label || data.proposedDuration,
        reasonForVisit: data.reasonForVisit,
        accessRequired: data.accessRequiredTo,
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center p-4"
      >
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center"
            >
              <CheckCircle className="h-8 w-8 text-green-600" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Registration Successful!
            </h2>
            <p className="text-muted-foreground mb-4">
              Your visit request has been submitted successfully. You will receive an email notification once your host approves the request.
            </p>
            <p className="text-sm text-muted-foreground">
              Please check your email for updates on your visit status.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-8 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <motion.div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <LogoIcon />
            </motion.div>
            <CardTitle className="text-2xl font-bold">
              <span className="text-foreground">Visitor Registration for </span>
              <span className="text-primary">Identra</span>
            </CardTitle>
            <p className="text-muted-foreground">
              Please fill out this form to request your visit
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Host Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Host Information
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="hostName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Host Name *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Host name"
                            disabled
                            className="bg-muted"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Visitor Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Visitor Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="visitorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Visitor Name *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter your full name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter company name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="idNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID Number *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter ID number" />
                          </FormControl>
                          <FormDescription>
                            Enter passport number if no ID available
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="attachIdCopy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Attach ID Copy *</FormLabel>
                          <FormControl>
                            <div className="flex items-center justify-center w-full">
                              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-accent/50">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                  <p className="mb-2 text-sm text-muted-foreground">
                                    <span className="font-semibold">Click to upload</span>
                                  </p>
                                  <p className="text-xs text-muted-foreground">PDF only (MAX 2MB)</p>
                                </div>
                                <input
                                  type="file"
                                  className="hidden"
                                  accept=".pdf"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      field.onChange(file);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="mobileNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter mobile number" type="tel" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emailAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter email address" type="email" />
                          </FormControl>
                          <FormDescription>
                            Confirmation will be sent to this email
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Visit Schedule */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Visit Schedule
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="proposedVisitDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Proposed Visit Date *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => field.onChange(date?.toISOString().split('T')[0])}
                                disabled={(date) =>
                                  date < new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="proposedVisitTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proposed Visit Time *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeIntervals.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="proposedDuration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proposed Duration *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {durationOptions.map((duration) => (
                                <SelectItem key={duration.value} value={duration.value}>
                                  {duration.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Visit Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Visit Details
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="reasonForVisit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason for Visit *</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter reason for visit (max 200 characters)"
                            maxLength={200}
                            rows={3}
                          />
                        </FormControl>
                        <FormDescription>
                          {field.value?.length || 0}/200 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="accessRequiredTo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Access Required to *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select access requirement" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {accessRequirements.map((access) => (
                                <SelectItem key={access} value={access}>
                                  {access}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="visitorRole"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specify Your Role *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {visitorRoles.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Multiple Visitors */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Number of Visitors
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="numberOfVisitors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Number of Visitors *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min={1}
                            max={20}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                            placeholder="Enter number of visitors"
                          />
                        </FormControl>
                        <FormDescription>
                          Including yourself (maximum 20 visitors)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Additional Visitors */}
                  <AnimatePresence>
                    {additionalVisitors.map((visitor, index) => (
                      <motion.div
                        key={visitor.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 border border-border rounded-lg bg-card space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-foreground">
                            Additional Visitor {index + 1}
                          </h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAdditionalVisitor(visitor.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Visitor Name *</Label>
                            <Input
                              value={visitor.name}
                              onChange={(e) => {
                                const updated = additionalVisitors.map(v =>
                                  v.id === visitor.id ? { ...v, name: e.target.value } : v
                                );
                                setAdditionalVisitors(updated);
                              }}
                              placeholder="Enter name"
                            />
                          </div>
                          <div>
                            <Label>Mobile Number *</Label>
                            <Input
                              value={visitor.mobileNumber}
                              onChange={(e) => {
                                const updated = additionalVisitors.map(v =>
                                  v.id === visitor.id ? { ...v, mobileNumber: e.target.value } : v
                                );
                                setAdditionalVisitors(updated);
                              }}
                              placeholder="Enter mobile number"
                            />
                          </div>
                          <div>
                            <Label>ID Number *</Label>
                            <Input
                              value={visitor.idNumber}
                              onChange={(e) => {
                                const updated = additionalVisitors.map(v =>
                                  v.id === visitor.id ? { ...v, idNumber: e.target.value } : v
                                );
                                setAdditionalVisitors(updated);
                              }}
                              placeholder="Enter ID number"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Notes */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Additional Notes
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Any additional information or special requirements..."
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-lg"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      "Submit Visit Request"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
