"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiSettings, FiBell } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/common/ThemeToggler";
import { useTranslation } from "@/hooks/useTranslation";
import { AuthClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UserProfileSectionProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    initials: string;
    role: string;
  };
}

const PROFILE_LINKS = [
  { href: "/dashboard/profile", label: "Profile", className: "" },
  { href: "/dashboard/settings", label: "Settings", className: "" },
  { href: "/logout", label: "Logout", className: "text-destructive" },
];

export const UserProfileSection: React.FC<UserProfileSectionProps> = ({
  user,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleMenuClick = async (href: string) => {
    if (href === "/logout") {
      try {
        setIsLoggingOut(true);
        await AuthClient.logout();
        toast.success(t("common.loggedOutSuccessfully") || "Logged out successfully");
        router.push("/");
      } catch (error) {
        console.error("Logout error:", error);
        toast.error(t("common.logoutError") || "Error logging out");
      } finally {
        setIsLoggingOut(false);
      }
    }
  };

  return (
    <div className="flex items-center space-x-3 ml-6">
      {/* Theme Toggle */}
      <div className="flex items-center">
        <ModeToggle />
      </div>

      {/* Notifications */}
      <button className="p-1 rounded-md hover:bg-muted transition-colors">
        <FiBell className="text-xl cursor-pointer text-muted-foreground hover:text-primary transition-colors" />
      </button>

      {/* User Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="p-1 rounded-full hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
            aria-label="Open user menu"
            disabled={isLoggingOut}
          >
            <Avatar className="cursor-pointer ring-2 ring-primary/40 hover:ring-primary transition-all w-9 h-9">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
                {user.initials}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 shadow-lg rounded-lg p-0"
        >
          <div className="px-4 py-4 flex flex-col gap-2 bg-gradient-to-r from-primary/5 to-transparent rounded-t-lg">
            <span className="text-center text-xs uppercase text-primary font-medium tracking-wide">
              {user.role} {t("common.account") || "Account"}
            </span>
            <span className="text-base font-semibold text-foreground truncate">
              {user.name}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {user.email}
            </span>
          </div>
          <DropdownMenuSeparator />
          <div className="p-2">
            {PROFILE_LINKS.map((link) => (
              <DropdownMenuItem
                key={link.href}
                className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors ${
                  link.className || ""
                }`}
                onClick={() => handleMenuClick(link.href)}
                disabled={isLoggingOut && link.href === "/logout"}
              >
                {link.href === "/logout" ? (
                  <span className="w-full text-left">
                    {isLoggingOut ? (t("common.loggingOut") || "Logging out...") : (t("common.logout") || link.label)}
                  </span>
                ) : (
                  <Link href={link.href} className="w-full text-left">
                    {t(`common.${link.label.toLowerCase()}`) || link.label}
                  </Link>
                )}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
