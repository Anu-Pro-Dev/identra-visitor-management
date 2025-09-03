// Visitors main view (to be filled with modern UI, shadcn, and animation)

"use client";
import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CiCalendar } from "react-icons/ci";
import { CgMenuBoxed } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VisitorsList } from "../components/VisitorsList";
import { VisitorsCalendarView } from "../components/VisitorsCalendarView";
import { VisitorsChart } from "../components/VisitorsChart";
import { AddVisitorDialog } from "../components/AddVisitorDialog";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { AuthClient } from "@/lib/auth/client";

export default function VisitorsPage() {
  const [view, setView] = useState("Calendar view");
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const loadUserRole = async () => {
      const user = await AuthClient.getCurrentUser();
      setUserRole(user?.role || "");
    };
    loadUserRole();
  }, []);

  const canAddVisitor = userRole.toLowerCase() === "security";
  return (
    <Tabs defaultValue="list" className="w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-center mt-2 lg:mt-5 justify-between w-full gap-4">
          <div className="flex flex-col">
            <p className="text-xl sm:text-2xl font-bold text-foreground">Visitors</p>
            <p className="text-muted-foreground text-sm font-semibold">
              New Visitor / {view}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <TabsList className="flex gap-2 rounded-full bg-card border border-border">
              <TabsTrigger
                value="calendar"
                onClick={() => setView("Calendar view")}
                className="group p-2 rounded-full data-[state=active]:bg-accent/20 border-none data-[state=active]:border-none cursor-pointer"
              >
                <CiCalendar className="text-[1.3rem] text-muted-foreground group-data-[state=active]:text-primary" />
              </TabsTrigger>
              <TabsTrigger
                value="list"
                onClick={() => setView("List view")}
                className="group p-2 rounded-full data-[state=active]:bg-accent/20 border-none data-[state=active]:border-none cursor-pointer"
              >
                <CgMenuBoxed className="text-[1.3rem] text-muted-foreground group-data-[state=active]:text-primary" />
              </TabsTrigger>
            </TabsList>

            <div className="relative w-full sm:w-[180px] lg:w-[250px]">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm" />
              <Input
                placeholder="Search visitor, updates..."
                className="h-10 pl-10 rounded-full bg-background border-border"
              />
            </div>

            <AddVisitorDialog canAdd={canAddVisitor} />
          </div>
        </div>

        <TabsContent value="calendar">
          <VisitorsCalendarView />
        </TabsContent>
        <TabsContent value="list">
          {/* List view with date navigation and filter */}
          <div className="flex flex-col w-full h-full">
            <p className="font-semibold text-sm text-muted-foreground mb-2">Today</p>
            <div className="w-full rounded-2xl bg-card shadow-lg p-0 sm:p-2 mb-8 border border-border transition-colors">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center px-4 py-3 gap-4 border-b border-border/60 bg-background rounded-t-2xl">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex flex-col items-center gap-1 shadow-sm w-12 h-12 rounded-lg font-bold bg-accent/20 dark:bg-accent/30">
                    <span className="p-1 text-xs font-semibold text-primary bg-accent/40 dark:bg-accent/60 w-full text-center rounded-t-lg">
                      {format(new Date(), "EEE")}
                    </span>
                    <p className="text-lg leading-none text-foreground">{format(new Date(), "d")}</p>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-lg font-bold text-foreground truncate">{format(new Date(), "MMMM d, yyyy")}</span>
                    <p className="text-xs text-muted-foreground truncate">{format(new Date(), "EEEE, MMM d")}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 flex-1 min-w-0">
                  <Select>
                    <SelectTrigger className="h-9 border border-border shadow-sm rounded-xl font-semibold min-w-[80px] max-w-[100px] text-sm text-foreground bg-background">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent className="bg-card rounded-xl shadow-lg z-50">
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="present">Present</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm font-medium border h-9 px-3 items-center justify-center rounded-xl shadow-sm text-foreground border-border bg-background hidden sm:flex">
                    {format(new Date(), "EEEE")}
                  </span>
                  <div className="w-8 h-8 rounded-full cursor-pointer shadow-sm flex items-center justify-center border border-border bg-background hover:bg-accent/10 transition">
                    <IoIosArrowBack className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="w-8 h-8 rounded-full cursor-pointer shadow-sm flex items-center justify-center border border-border bg-background hover:bg-accent/10 transition">
                    <IoIosArrowForward className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
              {/* Visitors List */}
              <div className="p-2 sm:p-4">
                <VisitorsList />
              </div>
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
