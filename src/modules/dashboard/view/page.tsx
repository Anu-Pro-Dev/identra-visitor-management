"use client";
import React, { useState } from "react";
import { LeaveCard } from "../components/LeaveCard";
import { VisitorList } from "../components/VisitorList";
import { VisitorCalendar } from "../components/VisitorCalendar";

// --- Data and helpers ---
import { IoAlarm } from "react-icons/io5";
import { CgSandClock } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const leavesData = [
  {
    label: "Total Visitors",
    value: "05",
    icon: <FaUsers className="text-primary text-[1.3rem]" />,
  },
  {
    label: "Total Meeting Hours",
    value: (
      <span>
        06:30
        <span className="text-xs text-muted-foreground font-normal">/hrs</span>
      </span>
    ),
    icon: <IoAlarm className="text-primary text-[1.3rem]" />,
  },
  {
    label: "Expected Spending Time",
    value: (
      <span>
        08:30
        <span className="text-xs text-muted-foreground font-normal">/hrs</span>
      </span>
    ),
    icon: (
      <CgSandClock className="text-yellow-500 dark:text-yellow-400 text-[1.3rem]" />
    ),
  },
  {
    label: "Actual Hours Spent",
    value: (
      <span>
        06:30
        <span className="text-xs text-muted-foreground font-normal">/hrs</span>
      </span>
    ),
    icon: (
      <CgSandClock className="text-cyan-500 dark:text-cyan-400 text-[1.3rem]" />
    ),
  },
  {
    label: "Upcoming Visitors",
    value: "02",
    icon: <FaArrowUpRightFromSquare className="text-primary" />,
  },
  {
    label: "Pending Approvals",
    value: "01",
    icon: <FaArrowUpRightFromSquare className="text-primary" />,
  },
];

const avatarCards = [
  {
    positionClass: "top-1/2 left-4 transform -translate-y-1/2",
    name: "James Mathe",
    role: "ABC Company · Developer",
    tag: "Vip",
    spanBgColor: "bg-primary/10",
    spanTextColor: "text-primary",
    avatars: [
      { src: "https://github.com/shadcn.png", fallback: "CN" },
      { src: "https://i.pravatar.cc/40?img=1", fallback: "AB" },
      { src: "https://i.pravatar.cc/40?img=2", fallback: "XY" },
      { src: "https://i.pravatar.cc/40?img=3", fallback: "JK" },
    ],
  },
  {
    positionClass: "bottom-4 left-1/2 transform -translate-x-1/2",
    name: "Olivia Benson",
    role: "XYZ Corp · Designer",
    tag: "Regulatory Authority",
    spanBgColor: "bg-destructive/10",
    spanTextColor: "text-destructive",
    avatars: [
      { src: "https://i.pravatar.cc/40?img=5", fallback: "OB" },
      { src: "https://i.pravatar.cc/40?img=6", fallback: "SD" },
      { src: "https://i.pravatar.cc/40?img=7", fallback: "KM" },
    ],
  },
  {
    positionClass: "top-1/3 right-4 transform -translate-y-1/2",
    name: "Liam Carter",
    role: "Dev Studios · Engineer",
    tag: "One time visitor",
    spanBgColor: "bg-accent/10",
    spanTextColor: "text-accent",
    avatars: [
      { src: "https://i.pravatar.cc/40?img=8", fallback: "LC" },
      { src: "https://i.pravatar.cc/40?img=9", fallback: "TW" },
    ],
  },
];

export default function DashboardPage() {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [monthIndex, setMonthIndex] = useState(currentDate.getMonth());
  const [currentDay, setCurrentDay] = useState(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.toLocaleString("default", { month: "long" })
  );

  // Keep month in sync with selection
  React.useEffect(() => {
    const monthIdx = months.indexOf(selectedMonth);
    if (monthIdx !== -1) {
      setMonthIndex(monthIdx);
      const newDate = new Date(currentDay);
      newDate.setMonth(monthIdx);
      setCurrentDay(newDate);
    }
  }, [selectedMonth]);

  const handleMonthChange = (monthString: string) => {
    if (monthString === "This month") {
      const now = new Date();
      setMonthIndex(now.getMonth());
      setYear(now.getFullYear());
      setSelectedMonth(now.toLocaleString("default", { month: "long" }));
    } else {
      setSelectedMonth(monthString);
    }
  };

  return (
    <section className="flex flex-col gap-6 w-full">
      <header className="mb-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back! Here’s a quick overview of your visitor activity and
          meetings.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <LeaveCard leavesData={leavesData} />
        <VisitorList
          year={year}
          monthIndex={monthIndex}
          onMonthChange={handleMonthChange}
          months={months}
        />
      </div>
      <VisitorCalendar
        months={months}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
        avatarCards={avatarCards}
      />
    </section>
  );
}
