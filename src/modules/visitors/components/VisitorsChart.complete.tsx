import React from "react";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

// Example data: visitors per day
const data = [
  { date: "Aug 1", checkedIn: 8, checkedOut: 5, pending: 2 },
  { date: "Aug 2", checkedIn: 10, checkedOut: 7, pending: 1 },
  { date: "Aug 3", checkedIn: 6, checkedOut: 6, pending: 0 },
  { date: "Aug 4", checkedIn: 12, checkedOut: 9, pending: 3 },
  { date: "Aug 5", checkedIn: 9, checkedOut: 8, pending: 2 },
  { date: "Aug 6", checkedIn: 7, checkedOut: 5, pending: 1 },
  { date: "Aug 7", checkedIn: 11, checkedOut: 10, pending: 2 },
];

export function VisitorsChart() {
  return (
    <Card className="w-full min-h-[320px] flex flex-col items-center justify-center rounded-2xl shadow-lg border border-border bg-card">
      <h3 className="text-lg font-bold mb-4 text-foreground">Visitor Activity (Last 7 Days)</h3>
      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#9ba9d2" fontSize={12} />
            <YAxis stroke="#9ba9d2" fontSize={12} />
            <Tooltip contentStyle={{ background: '#fff', borderRadius: 8, fontSize: 13 }} />
            <Legend />
            <Bar dataKey="checkedIn" fill="#0078D4" name="Checked In" radius={[4, 4, 0, 0]} />
            <Bar dataKey="checkedOut" fill="#34d399" name="Checked Out" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pending" fill="#fbbf24" name="Pending" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
