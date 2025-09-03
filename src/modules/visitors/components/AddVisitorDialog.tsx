"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { RegisterForm } from "@/modules/register/components/RegisterForm";

interface AddVisitorDialogProps {
  canAdd: boolean;
}

export function AddVisitorDialog({ canAdd }: AddVisitorDialogProps) {
  const [open, setOpen] = useState(false);

  if (!canAdd) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="default" 
          className="flex items-center px-4 gap-2 rounded-full font-bold text-sm bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
          Add Visitor
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register New Visitor</DialogTitle>
          <DialogDescription>
            Fill out the form below to register a new visitor to the facility.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <RegisterForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
