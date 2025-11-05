"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "../common/ThemeToggler";
import { IconBell, IconLogout, IconUser } from "@tabler/icons-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";
import { AuthClient, User } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function SiteHeader() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await AuthClient.getCurrentUser();
      setUser(currentUser);
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AuthClient.logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <header className="flex h-16 shrink-0 items-center mx-auto gap-4 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 sticky top-0 z-40 rounded-t-xl">
      <div className="flex w-full items-center gap-4 ">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-1 hover:bg-accent transition-colors duration-200" />
          <Separator orientation="vertical" className="h-5 bg-border/50" />
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
            <p className="text-xs text-muted-foreground">
              Welcome back, {user?.name || "Guest"}
            </p>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-auto"></div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="relative h-9 w-9 p-0 hover:bg-accent transition-colors duration-200"
          >
            <IconBell className="h-4 w-4" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              3
            </Badge>
          </Button>
          <Separator orientation="vertical" className="h-5 bg-border/50 mx-2" />
          <ModeToggle />
          <Separator orientation="vertical" className="h-5 bg-border/50 mx-2" />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full p-0"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    Role: {user?.role}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <IconUser className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <IconLogout className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
