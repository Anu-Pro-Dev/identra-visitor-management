"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Calendar } from "../../../components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../../../components/ui/popover";
import { Checkbox } from "../../approvals/components/checkbox";
import { Button } from "../../../components/ui/button";
import { BsBoxArrowRight } from "react-icons/bs";
import { PiMicrosoftExcelLogo, PiMicrosoftWordLogoBold } from "react-icons/pi";
import { VscFilePdf } from "react-icons/vsc";

const StandardReports = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);

  const DateField = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: Date | undefined;
    onChange: (date: Date) => void;
  }) => (
    <div className="w-full flex items-center gap-8">
      <label className="text-[15px] font-semibold text-foreground dark:text-foreground/80">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <div className="w-[60%] h-10 bg-background px-4 flex justify-between items-center border border-border rounded-full text-left cursor-text">
            <input
              type="text"
              placeholder="Select date"
              value={value ? format(value, "dd/MM/yyyy") : ""}
              onChange={(e) => {
                const parsed = new Date(e.target.value);
                if (!isNaN(parsed.getTime())) onChange(parsed);
              }}
              className="text-sm text-foreground bg-transparent focus:outline-none w-full"
            />
            <CalendarDays className="w-4 h-4 text-muted-foreground ml-2" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => date && onChange(date)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <div className="shadow-card rounded-[10px] bg-background p-2 ">
      <div className="flex flex-col justify-between p-4 gap-2 w-full">
        <h5 className="text-[22px] text-primary font-bold">Standard reports</h5>
        <p className="text-sm text-muted-foreground font-semibold">Select the Filter you want to view</p>

        <div className="flex mt-[3%] ml-[4%] items-center w-full gap-[6%]">
          <DateField label="From Date" value={fromDate} onChange={setFromDate} />
          <DateField label="To Date" value={toDate} onChange={setToDate} />
        </div>

        <div className="mt-[4%] ml-[4%] font-semibold text-foreground flex gap-[4%]">
          <p className="text-[15px] mb-4">Status</p>
          <div className="flex flex-col gap-6">
            {["Approved", "Rejected", "Pending"].map((status) => (
              <label key={status} className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox className="h-[15px] w-[15px] " />
                {status}
              </label>
            ))}

            <div className="flex gap-4 mt-[3%] text-[13px]">
              <Button className="flex items-center gap-2 bg-primary text-[13px] h-[40px]">
                <BsBoxArrowRight /> Show report
              </Button>
              <Button className="flex items-center gap-2 bg-green-600 text-[13px] h-[40px]">
                <PiMicrosoftExcelLogo /> Export to excel
              </Button>
              <Button className="flex items-center gap-2 bg-red-600 text-[13px] h-[40px]">
                <VscFilePdf /> Export to PDF
              </Button>
              <Button className="flex items-center gap-2 bg-primary text-[13px] h-[40px]">
                <PiMicrosoftWordLogoBold /> Export to Word 
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardReports;
