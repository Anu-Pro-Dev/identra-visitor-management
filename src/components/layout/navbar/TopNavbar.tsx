"use client";
import React, { useState, useEffect } from "react";
import { NavbarLogo } from "./NavbarLogo";
import { DesktopNav } from "./DesktopNav";
import { UserProfileSection } from "./UserProfileSection";
import { MobileMenuToggle } from "./MobileMenuToggle";
import { MobileDrawer } from "./MobileDrawer";
import { AuthClient } from "@/lib/auth/client";

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TopNavbarProps {
  navItems: NavItem[];
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ navItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUser = await AuthClient.getCurrentUser();
        if (currentUser) {
          setUser({
            name: currentUser.name || "User",
            email: currentUser.email || "",
            avatar: currentUser.avatar || "",
            initials: currentUser.name?.charAt(0).toUpperCase() || "U",
            role: currentUser.role || "User",
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getCurrentUser();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Left Section: Logo and Desktop Navigation */}
        <div className="flex items-center">
          <NavbarLogo />
          <DesktopNav navItems={navItems} />
        </div>

        {/* Right Section: User Profile and Mobile Menu */}
        <div className="flex items-center">
          {user && <UserProfileSection user={user} />}
          
          <MobileDrawer
            navItems={navItems}
            isOpen={isMobileMenuOpen}
            onOpenChange={setIsMobileMenuOpen}
            trigger={<MobileMenuToggle onClick={() => setIsMobileMenuOpen(true)} />}
          />
        </div>
      </div>
    </header>
  );
};
