"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Visitor } from "./VisitorsList";

export function VisitorListItem({ visitor }: { visitor: Visitor }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <motion.div
          whileHover={{
            scale: 1.01,
            boxShadow: "0 4px 24px 0 rgba(80,80,180,0.10)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="cursor-pointer w-full"
        >
          <Card className="group w-full flex flex-col sm:flex-row items-stretch gap-4 sm:gap-0 p-4 rounded-xl border border-border shadow-md bg-card hover:bg-accent/10 dark:hover:bg-accent/20 transition-colors">
            {/* Avatars left */}
            <div className="flex flex-row sm:flex-col items-center justify-center sm:justify-start sm:items-start min-w-[60px] sm:min-w-[80px] gap-2 sm:gap-0 mb-2 sm:mb-0 mr-2 sm:mr-6">
              <Avatar className="w-12 h-12 border-2 border-accent shadow">
                <AvatarImage src={visitor.avatar} />
                <AvatarFallback>{visitor.name[0]}</AvatarFallback>
              </Avatar>
              {visitor.avatars &&
                visitor.avatars.slice(1, 3).map((a, i) => (
                  <Avatar
                    key={i}
                    className="w-8 h-8 border-2 border-accent/40 shadow -ml-3 sm:ml-0 sm:mt-[-12px]"
                  >
                    <AvatarImage src={a} />
                    <AvatarFallback>{visitor.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
            </div>
            {/* Main info center */}
            <div className="flex-1 min-w-0 flex flex-col justify-center sm:justify-start w-full">
              <div className="font-semibold text-lg text-foreground flex flex-wrap items-center gap-2 break-words">
                {visitor.name}
                {visitor.spanText && (
                  <span className="ml-2 py-1 px-2 text-xs rounded-md font-medium bg-accent/20 text-accent border border-accent/30 dark:bg-accent/30 dark:text-accent-foreground">
                    {visitor.spanText}
                  </span>
                )}
              </div>
              <div className="text-sm text-muted-foreground break-words">
                {visitor.company}
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-xs text-primary flex items-center gap-1">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 6v6l4 2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  {visitor.time}
                </span>
              </div>
            </div>
            {/* Status/details right */}
            <div className="flex flex-col sm:flex-col items-end gap-2 min-w-[110px] sm:pl-6 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0">
              <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800 w-full sm:w-auto text-center">
                {visitor.status || "Yet to arrive"}
              </span>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                Details
              </Button>
            </div>
          </Card>
        </motion.div>
      </SheetTrigger>
      <SheetContent side="right" className="max-w-md w-full px-0 md:px-0">
        <SheetHeader className="px-4 pt-4 md:px-6 md:pt-6">
          <SheetTitle className="text-2xl font-bold mb-2">
            Visitor Details
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-4 pb-6 pt-2 md:px-6 md:pb-8">
          {/* Avatars and name */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 border-b border-border pb-4">
            <Avatar className="w-16 h-16 border-2 border-accent shadow shrink-0">
              <AvatarImage src={visitor.avatar} />
              <AvatarFallback>{visitor.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left w-full">
              <span className="font-bold text-xl text-foreground leading-tight break-words w-full">
                {visitor.name}
              </span>
              <span className="text-sm text-muted-foreground leading-tight break-words w-full">
                {visitor.company}
              </span>
              {visitor.spanText && (
                <span className="mt-1 py-1 px-2 text-xs rounded font-medium bg-accent/20 text-accent border border-accent/30 dark:bg-accent/30 dark:text-accent-foreground w-fit">
                  {visitor.spanText}
                </span>
              )}
            </div>
          </div>
          {/* Status and time */}
          <div className="flex flex-wrap gap-3 items-center justify-center sm:justify-start">
            <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800">
              {visitor.status || "Yet to arrive"}
            </span>
            <span className="text-xs font-medium px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">
              {visitor.time}
            </span>
          </div>
          {/* Contact info */}
          <div className="flex flex-col gap-1 items-center sm:items-start">
            {visitor.email && (
              <span className="text-sm text-muted-foreground break-words">
                <span className="font-semibold text-foreground">Email:</span>{" "}
                {visitor.email}
              </span>
            )}
            {visitor.phone && (
              <span className="text-sm text-muted-foreground break-words">
                <span className="font-semibold text-foreground">Phone:</span>{" "}
                {visitor.phone}
              </span>
            )}
          </div>
          {/* Badge info */}
          {visitor.badgeAssigned && (
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-xs font-semibold px-2 py-1 rounded bg-accent/20 text-accent border border-accent/30">
                Badge: {visitor.badgeAssigned}
              </span>
            </div>
          )}
          {/* Extra avatars if any */}
          {visitor.avatars && visitor.avatars.length > 1 && (
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <span className="text-xs text-muted-foreground">With:</span>
              {visitor.avatars.slice(1).map((a, i) => (
                <Avatar
                  key={i}
                  className="w-8 h-8 border-2 border-accent/40 shadow"
                >
                  <AvatarImage src={a} />
                  <AvatarFallback>G{i + 1}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
