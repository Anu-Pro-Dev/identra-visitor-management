"use client";
import React from "react";
import Link from "next/link";

export const NavbarLogo = () => {
  return (
    <div className="flex items-center space-x-2 font-semibold text-lg text-primary">
      <Link href="/dashboard" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">I</span>
        </div>
        <span className="hidden sm:block font-bold">Identra</span>
      </Link>
    </div>
  );
};
