import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedCard } from "../components/AnimatedCard";
import { motion } from "framer-motion";

interface LeaveCardProps {
  leavesData: Array<{ label: string; value: React.ReactNode; icon: React.ReactNode }>;
}

export function LeaveCard({ leavesData }: LeaveCardProps) {
  return (
    <AnimatedCard className="rounded-2xl bg-card p-4 h-full shadow-sm border border-border">
      <div className="flex flex-row justify-between items-center mb-2">
        <h5 className="font-semibold text-lg text-foreground tracking-tight">Visitors Overview</h5>
  <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1 px-2 py-1 h-8 rounded-lg cursor-pointer">
          View More <span className="text-base">→</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {leavesData.map((item) => (
          <motion.div
            key={item.label}
            className="flex flex-col justify-between bg-muted/50 rounded-xl p-4 shadow-sm border border-border cursor-pointer"
            whileHover={{ scale: 1.04, boxShadow: "0 4px 24px 0 rgba(80,80,180,0.10)" }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{item.label}</p>
              <div className="w-9 h-9 flex justify-center items-center rounded-lg bg-background border border-border">
                {item.icon}
              </div>
            </div>
            <p className="text-2xl font-bold pt-2 text-foreground">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </AnimatedCard>
  );
}
