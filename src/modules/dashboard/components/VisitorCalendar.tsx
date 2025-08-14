import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatedCard } from "../components/AnimatedCard";
import { motion } from "framer-motion";

interface AvatarCard {
  positionClass: string;
  name: string;
  role: string;
  tag?: string;
  spanBgColor: string;
  spanTextColor: string;
  avatars: { src: string; fallback: string }[];
}

interface VisitorCalendarProps {
  months: string[];
  selectedMonth: string;
  setSelectedMonth: (m: string) => void;
  currentDay: Date;
  setCurrentDay: (d: Date) => void;
  avatarCards: AvatarCard[];
}

export function VisitorCalendar({ months, selectedMonth, setSelectedMonth, currentDay, setCurrentDay, avatarCards }: VisitorCalendarProps) {
  const today = new Date();

  const handlePreviousDay = () => {
    setCurrentDay(new Date(currentDay.getTime() - 86400000));
  };
  const handleNextDay = () => {
    setCurrentDay(new Date(currentDay.getTime() + 86400000));
  };
  const isToday = (date1: Date, date2: Date) => date1.toDateString() === date2.toDateString();
  const formattedDate = isToday(currentDay, today)
    ? `Today, ${currentDay.getDate()} ${currentDay.toLocaleString('default', { month: 'long' })}`
    : `${currentDay.toLocaleDateString("en-US", { weekday: "long" })}, ${currentDay.getDate()} ${currentDay.toLocaleString('default', { month: 'long' })}`;

  return (
    <AnimatedCard className="rounded-2xl bg-gradient-to-br from-card/90 to-background/80 p-6 mt-4 shadow-lg border border-border backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <h5 className="font-semibold text-xl text-foreground tracking-tight drop-shadow-sm">Visitor Calendar</h5>
        <div className="flex flex-wrap gap-4 items-center">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="h-10 border pl-3 border-border shadow-sm rounded-xl text-sm flex gap-2 w-[140px] bg-background/80 focus:ring-2 focus:ring-primary/50">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent className="bg-card/95 rounded-xl">
              {months.map((month) => (
                <SelectItem key={month} value={month}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold border border-border rounded-xl px-4 h-10 flex items-center justify-center shadow-sm text-foreground bg-muted/60 backdrop-blur-sm">
              {formattedDate}
            </div>
            <Button variant="outline" size="icon" onClick={handlePreviousDay} className="p-2 rounded-xl hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-primary/50">
              <IoIosArrowBack className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextDay} className="p-2 rounded-xl hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-primary/50">
              <IoIosArrowForward className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col justify-between min-h-[320px] md:min-h-[400px]">
        <div className="flex justify-between px-2 md:px-8 mt-4">
          {Array.from({ length: 14 }, (_, index) => {
            const hour = index + 8;
            return (
              <div key={hour} className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground mb-1 font-medium drop-shadow-sm">{hour}:00</span>
                <div className="border-l-2 border-dashed text-border bg-border/20" style={{ height: "320px", width: "2px", borderRadius: "2px" }} />
              </div>
            );
          })}
        </div>
        {avatarCards.map((card, index) => (
          <motion.div
            key={index}
            className={`absolute ${card.positionClass} bg-background/80 p-5 border border-border rounded-2xl shadow-xl focus-within:ring-2 focus-within:ring-primary/50 backdrop-blur-lg cursor-pointer`}
            style={{ zIndex: 2 }}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <div className="flex items-center">
              <div className="flex -space-x-5">
                {card.avatars.map((avatar, idx) => (
                  <Avatar key={idx} className="w-10 h-10 border-2 border-card bg-card shadow-md">
                    <AvatarImage src={avatar.src} />
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="ml-4">
                <p className="text-base flex items-center flex-row text-foreground font-semibold drop-shadow-sm">
                  {card.name}
                  {card.tag && (
                    <span className={`${card.spanBgColor} ${card.spanTextColor} ml-2 px-2 py-1 rounded text-[11px] border shadow-sm font-medium backdrop-blur-sm`}> 
                      <span className='font-black'> · </span> {card.tag}
                    </span>
                  )}
                </p>
                <p className="text-[12px] text-muted-foreground mt-1">{card.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedCard>
  );
}
