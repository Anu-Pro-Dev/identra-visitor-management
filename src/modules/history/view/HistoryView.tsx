"use client";

import { motion } from "framer-motion";
import { PageContainer } from "@/components/common/PageContainer";
import HistoryTable from "../components/HistoryTable";
import { History } from "lucide-react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  duration: 0.4
};

export default function HistoryView() {
  return (
    <PageContainer>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <History className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Visitor History</h1>
            <p className="text-muted-foreground">
              Track and manage visitor history with detailed analytics and filtering
            </p>
          </div>
        </div>

        {/* History Table */}
        <HistoryTable />
      </motion.div>
    </PageContainer>
  );
}
