"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { VisitorListItem } from "./VisitorListItem";

export type Visitor = {
  id: string;
  name: string;
  company: string;
  avatar: string;
  avatars?: string[];
  spanText?: string;
  status: "Checked In" | "Checked Out" | "Pending";
  time: string;
  email?: string;
  phone?: string;
  badgeAssigned?: string;
};

const mockVisitors: Visitor[] = [
  {
    id: "1",
    name: "James Mathe",
    company: "ABC Company · Developer",
    avatar: "https://github.com/shadcn.png",
    avatars: [
      "https://github.com/shadcn.png",
      "https://i.pravatar.cc/40?img=1",
      "https://i.pravatar.cc/40?img=2"
    ],
    spanText: "One time visitor",
    status: "Checked In",
    time: "10:00 - 11:00 AM",
    email: "james.mathe@abc.com",
    phone: "+1 (555) 123-4567",
    badgeAssigned: "UAE, EMA-24031"
  },
  {
    id: "2",
    name: "Olivia Benson",
    company: "XYZ Corp · Product Manager",
    avatar: "https://i.pravatar.cc/40?img=5",
    avatars: [
      "https://i.pravatar.cc/40?img=5",
      "https://i.pravatar.cc/40?img=6"
    ],
    spanText: "Supplier/Contractor",
    status: "Checked Out",
    time: "01:00 - 02:30 PM",
    email: "olivia.benson@xyz.com",
    phone: "+1 (555) 987-6543",
    badgeAssigned: "UAE, EMA-24032"
  },
  {
    id: "3",
    name: "Liam Carter",
    company: "Dev Studios · Designer",
    avatar: "https://i.pravatar.cc/40?img=8",
    avatars: [
      "https://i.pravatar.cc/40?img=8"
    ],
    spanText: "Interview",
    status: "Pending",
    time: "11:00 AM - 12:00 PM",
    email: "liam.carter@devstudios.com",
    phone: "+1 (555) 555-5555",
    badgeAssigned: "UAE, EMA-24033"
  }
];

export function VisitorsList() {
  return (
    <div className="flex flex-col gap-4">
      {mockVisitors.map((visitor) => (
        <VisitorListItem key={visitor.id} visitor={visitor} />
      ))}
    </div>
  );
}
