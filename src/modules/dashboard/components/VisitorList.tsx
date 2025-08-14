import React from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnimatedCard } from "../components/AnimatedCard";

interface VisitorListProps {
  year: number;
  monthIndex: number;
  onMonthChange: (m: string) => void;
  months: string[];
}

export function VisitorList({ year, monthIndex, onMonthChange, months }: VisitorListProps) {
  const currentMonthIndex = new Date().getMonth();
  const monthsWithThisMonth = months.map((month, index) => (index === currentMonthIndex ? "This month" : month));
  const selectedMonthName = monthIndex === currentMonthIndex ? "This month" : months[monthIndex];

  return (
    <AnimatedCard className="rounded-2xl bg-card p-4 shadow-sm border border-border h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h5 className="font-semibold text-lg text-foreground tracking-tight">Visitor List</h5>
        <Select value={selectedMonthName} onValueChange={onMonthChange}>
          <SelectTrigger className="w-auto h-9 border pl-3 border-border shadow-sm rounded-xl text-sm flex gap-2 bg-background">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent className="bg-card rounded-xl">
            {monthsWithThisMonth.map((month) => (
              <SelectItem key={month} value={month}>{month}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <span className="text-muted-foreground text-sm">(Calendar pagination placeholder)</span>
      </div>
    </AnimatedCard>
  );
}
