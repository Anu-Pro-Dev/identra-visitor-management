import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";

// Simple custom calendar grid (no shadcn UI)
export function CustomCalendar({ selected, onSelect }: { selected: Date; onSelect: (date: Date) => void }) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(selected));

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-2">
      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="px-2 py-1 rounded bg-accent/20 hover:bg-accent/40">&lt;</button>
      <span className="font-semibold">{format(currentMonth, "MMMM yyyy")}</span>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="px-2 py-1 rounded bg-accent/20 hover:bg-accent/40">&gt;</button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-xs font-bold text-center text-muted-foreground">
          {format(addDays(startDate, i), "EEE")}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-1">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = isSameDay(day, selected);
        days.push(
          <div
            className={`h-10 flex items-center justify-center cursor-pointer rounded-lg transition text-sm font-medium
              ${isCurrentMonth ? "text-foreground" : "text-muted-foreground/50"}
              ${isSelected ? "bg-primary text-primary-foreground" : "hover:bg-accent/30"}`}
            key={day.toString()}
            onClick={() => isCurrentMonth && onSelect(day)}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="w-full max-w-xs p-2 bg-background border border-border rounded-xl shadow-md">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
