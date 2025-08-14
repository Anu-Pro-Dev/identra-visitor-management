"use client";
// Reusable animated card wrapper using Framer Motion
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

export function AnimatedCard({ children, className, ...props }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.18 }}
      className={cn("transition-all duration-300 ease-in-out", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
