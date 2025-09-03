"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { 
  Camera, 
  CreditCard, 
  Scan, 
  User, 
  Clock, 
  CheckCircle, 
  Printer,
  QrCode,
  AlertTriangle 
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { accessLevels } from "../schema/SecurityRegistrationSchema";

// Mock scheduled meetings data
const mockScheduledMeetings = [
  {
    id: "meet-001",
    visitorName: "Alice Johnson",
    company: "TechCorp Solutions",
    hostName: "John Smith",
    scheduledTime: "09:00",
    scheduledDate: "2024-01-15",
    duration: "2 hours",
    purpose: "Project Planning Discussion",
    status: "approved",
    numberOfVisitors: 1,
    accessRequired: "Conference Room A"
  },
  {
    id: "meet-002", 
    visitorName: "Mark Wilson",
    company: "Global Consulting",
    hostName: "Sarah Johnson",
    scheduledTime: "10:30",
    scheduledDate: "2024-01-15", 
    duration: "1.5 hours",
    purpose: "Contract Review Meeting",
    status: "approved",
    numberOfVisitors: 2,
    accessRequired: "Executive Floor"
  },
  {
    id: "meet-003",
    visitorName: "Emma Davis",
    company: "Design Studio Inc",
    hostName: "Michael Brown",
    scheduledTime: "14:00",
    scheduledDate: "2024-01-15",
    duration: "3 hours", 
    purpose: "Product Design Review",
    status: "approved",
    numberOfVisitors: 1,
    accessRequired: "Conference Room B"
  },
];

interface ScheduledVisitorRegistrationProps {
  onClose?: () => void;
}

export function ScheduledVisitorRegistration({ 
  onClose 
}: ScheduledVisitorRegistrationProps) {
  const [selectedMeeting, setSelectedMeeting] = useState<typeof mockScheduledMeetings[0] | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [isGeneratingBadge, setIsGeneratingBadge] = useState(false);
  const [badgeGenerated, setBadgeGenerated] = useState(false);
  const [checkInTime, setCheckInTime] = useState(format(new Date(), "HH:mm"));
  const [securityNotes, setSecurityNotes] = useState("");
  const [selectedAccessLevel, setSelectedAccessLevel] = useState("");

  // Simulate ID card scanning
  const simulateIdScan = async () => {
    setIsScanning(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock scanned data
    const mockScannedData = {
      name: selectedMeeting?.visitorName || "John Doe",
      idNumber: "ID123456789", 
      photo: "/api/placeholder/100/120",
      address: "123 Main St, City, State 12345",
      dateOfBirth: "1990-01-01",
      nationality: "US"
    };
    
    setScannedData(mockScannedData);
    setIsScanning(false);
  };

  // Generate badge
  const generateBadge = async () => {
    if (!selectedMeeting || !scannedData || !selectedAccessLevel) return;
    
    setIsGeneratingBadge(true);
    
    // Simulate badge generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setBadgeGenerated(true);
    setIsGeneratingBadge(false);
    
    // Show success notification
    console.log("Badge generated successfully");
  };

  // Print badge
  const printBadge = () => {
    // Simulate printing
    console.log("Printing badge...");
    // In real implementation, this would trigger printer API
    alert("Badge sent to printer!");
  };

  const resetForm = () => {
    setSelectedMeeting(null);
    setScannedData(null);
    setBadgeGenerated(false);
    setCheckInTime(format(new Date(), "HH:mm"));
    setSecurityNotes("");
    setSelectedAccessLevel("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Register Scheduled Visitor</h2>
          <p className="text-muted-foreground">Check in visitors with approved meetings</p>
        </div>
        <Button variant="outline" onClick={resetForm}>
          <User className="w-4 h-4 mr-2" />
          New Registration
        </Button>
      </div>

      {/* Meeting Selection */}
      {!selectedMeeting && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Today's Scheduled Meetings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockScheduledMeetings.map((meeting) => (
              <motion.div
                key={meeting.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 border border-border rounded-lg cursor-pointer hover:bg-accent/50"
                onClick={() => setSelectedMeeting(meeting)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-foreground">{meeting.visitorName}</h3>
                      <Badge variant="secondary">{meeting.company}</Badge>
                      <Badge variant="outline">
                        {meeting.numberOfVisitors} visitor{meeting.numberOfVisitors > 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                      <div>Host: {meeting.hostName}</div>
                      <div>Time: {meeting.scheduledTime}</div>
                      <div>Duration: {meeting.duration}</div>
                      <div>Access: {meeting.accessRequired}</div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{meeting.purpose}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default" className="bg-green-500">
                      {meeting.status}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Selected Meeting Details and ID Scanning */}
      {selectedMeeting && !scannedData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="font-medium">Visitor</Label>
                  <p>{selectedMeeting.visitorName}</p>
                </div>
                <div>
                  <Label className="font-medium">Company</Label>
                  <p>{selectedMeeting.company}</p>
                </div>
                <div>
                  <Label className="font-medium">Host</Label>
                  <p>{selectedMeeting.hostName}</p>
                </div>
                <div>
                  <Label className="font-medium">Scheduled Time</Label>
                  <p>{selectedMeeting.scheduledTime}</p>
                </div>
                <div>
                  <Label className="font-medium">Duration</Label>
                  <p>{selectedMeeting.duration}</p>
                </div>
                <div>
                  <Label className="font-medium">Visitors</Label>
                  <p>{selectedMeeting.numberOfVisitors}</p>
                </div>
              </div>
              <div>
                <Label className="font-medium">Purpose</Label>
                <p className="text-sm text-muted-foreground">{selectedMeeting.purpose}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scan className="w-5 h-5 mr-2" />
                ID Card Scanning
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {!isScanning ? (
                <>
                  <div className="p-8 border-2 border-dashed border-muted rounded-lg">
                    <CreditCard className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">
                      Place visitor's ID card on the scanner
                    </p>
                    <Button onClick={simulateIdScan} className="w-full">
                      <Camera className="w-4 h-4 mr-2" />
                      Start ID Scan
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    * Ensure ID card is placed correctly for optimal scanning
                  </p>
                </>
              ) : (
                <div className="p-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <p className="text-primary font-medium">Scanning ID Card...</p>
                  <p className="text-sm text-muted-foreground">Please wait while we process the document</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Scanned Data and Badge Generation */}
      {scannedData && selectedMeeting && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                ID Verification Complete
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-24 bg-muted rounded border flex items-center justify-center">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <Label className="font-medium">Full Name</Label>
                    <p>{scannedData.name}</p>
                  </div>
                  <div>
                    <Label className="font-medium">ID Number</Label>
                    <p>{scannedData.idNumber}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Nationality</Label>
                    <p>{scannedData.nationality}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Date of Birth</Label>
                    <p>{scannedData.dateOfBirth}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="font-medium">Address</Label>
                <p className="text-sm text-muted-foreground">{scannedData.address}</p>
              </div>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkInTime">Check-in Time</Label>
                    <Input
                      id="checkInTime"
                      type="time"
                      value={checkInTime}
                      onChange={(e) => setCheckInTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="accessLevel">Access Level</Label>
                    <Select value={selectedAccessLevel} onValueChange={setSelectedAccessLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select access level" />
                      </SelectTrigger>
                      <SelectContent>
                        {accessLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="securityNotes">Security Notes (Optional)</Label>
                <Textarea
                  id="securityNotes"
                  placeholder="Any security observations or notes..."
                  value={securityNotes}
                  onChange={(e) => setSecurityNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <QrCode className="w-5 h-5 mr-2" />
                Badge Generation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!badgeGenerated ? (
                <div className="text-center p-6">
                  <div className="w-32 h-40 mx-auto border-2 border-dashed border-muted rounded-lg flex flex-col items-center justify-center mb-4">
                    <CreditCard className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Badge Preview</p>
                  </div>
                  
                  {!selectedAccessLevel ? (
                    <div className="flex items-center justify-center space-x-2 text-amber-600">
                      <AlertTriangle className="w-4 h-4" />
                      <p className="text-sm">Please select access level to continue</p>
                    </div>
                  ) : (
                    <Button
                      onClick={generateBadge}
                      disabled={isGeneratingBadge || !selectedAccessLevel}
                      className="w-full"
                    >
                      {isGeneratingBadge ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Generating Badge...
                        </>
                      ) : (
                        <>
                          <QrCode className="w-4 h-4 mr-2" />
                          Generate Badge
                        </>
                      )}
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-32 h-40 mx-auto bg-white border rounded-lg p-2 shadow-md">
                      <div className="text-center space-y-1">
                        <div className="w-12 h-12 mx-auto bg-muted rounded border flex items-center justify-center">
                          <User className="w-6 h-6" />
                        </div>
                        <div className="text-xs font-bold">VISITOR</div>
                        <div className="text-xs">{scannedData.name}</div>
                        <div className="text-xs text-muted-foreground">{selectedMeeting.company}</div>
                        <div className="text-xs">Host: {selectedMeeting.hostName}</div>
                        <div className="w-12 h-12 mx-auto bg-black rounded flex items-center justify-center">
                          <QrCode className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-xs">{format(new Date(), "dd/MM/yyyy")}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <Label className="font-medium">Badge Number</Label>
                      <p>VB-{Date.now().toString().slice(-6)}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Valid Until</Label>
                      <p>{format(new Date(), "dd/MM/yyyy")} 18:00</p>
                    </div>
                  </div>

                  <Button onClick={printBadge} className="w-full">
                    <Printer className="w-4 h-4 mr-2" />
                    Print Badge
                  </Button>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <p className="font-medium">Visitor Successfully Registered</p>
                    </div>
                    <p className="text-sm text-center text-muted-foreground mt-2">
                      Badge valid for {selectedAccessLevel}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
