"use client";
import { ChevronDown, Funnel, Trash2, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const companyOptions = [
  { label: "sample1", value: "sample1" },
  { label: "sample2", value: "sample2" },
];

export function CompanyHeader({
  companyFilter,
  setCompanyFilter,
}: {
  companyFilter: string;
  setCompanyFilter: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between w-full py-2">
      <div className="flex flex-col gap-1">
        <p className="text-2xl font-bold text-foreground flex gap-1 items-center">Company <ChevronDown className="cursor-pointer" /></p>
        <p className="text-muted-foreground text-sm font-semibold">Company</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        <div className="relative w-[150px] md:w-[250px]">
          <Input
            placeholder="Search company..."
            value={companyFilter}
            onChange={e => setCompanyFilter(e.target.value)}
            className="h-10 pl-4 rounded-full text-muted-foreground text-sm"
          />
        </div>
        <Button className="h-[35px] px-2 bg-accent text-accent-foreground rounded-full">
          <Funnel className="mr-1 w-4 h-4" />
          Filter
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="h-[35px] px-2 bg-primary text-primary-foreground rounded-full">
              <CirclePlus className="mr-1 w-4 h-4" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Add Company</DialogTitle>
              <DialogDescription>Select appropriate options to create new Company</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div>
                <label className="block font-bold mb-1">Company <span className="text-red-600">*</span></label>
                <Input placeholder="Enter company name" className="w-full rounded-full" required />
              </div>
              <div>
                <label className="block font-bold mb-1">Category <span className="text-red-600">*</span></label>
                <select className="w-full rounded-full border p-2">
                  {companyOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </form>
            <DialogFooter className="flex w-full gap-2 pt-2">
              <DialogClose asChild>
                <Button variant="outline" className="flex-1 rounded-full">Cancel</Button>
              </DialogClose>
              <Button className="flex-1 bg-primary text-primary-foreground rounded-full" onClick={() => setOpen(false)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button className="h-[35px] px-2 bg-muted text-foreground rounded-full">
          <Trash2 className="mr-1 w-4 h-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}
