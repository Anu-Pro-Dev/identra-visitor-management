"use client";
import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuToggleProps {
  onClick: () => void;
}

export const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({ onClick }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="lg:hidden"
      onClick={onClick}
    >
      <Menu className="h-6 w-6" />
      <span className="sr-only">Toggle menu</span>
    </Button>
  );
};
