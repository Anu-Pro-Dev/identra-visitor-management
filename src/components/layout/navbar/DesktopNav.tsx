"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface DesktopNavProps {
  navItems: NavItem[];
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ navItems }) => {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex items-center relative ml-8">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
        
        return (
          <div
            key={item.url}
            className="relative flex flex-col items-center px-1"
          >
            <motion.div
              className={cn(
                "flex text-nowrap group w-auto items-center justify-center px-4 py-2 rounded-xl font-semibold transition-colors duration-200 cursor-pointer text-xs",
                isActive
                  ? "bg-primary text-white shadow-lg"
                  : "dark:text-white text-foreground hover:bg-muted"
              )}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
              }}
            >
              <Link href={item.url} className="flex items-center">
                <Icon className="text-lg mr-2" />
                <AnimatePresence>
                  <motion.span
                    className="text-xs overflow-hidden"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                  >
                    {item.title}
                  </motion.span>
                </AnimatePresence>
              </Link>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
