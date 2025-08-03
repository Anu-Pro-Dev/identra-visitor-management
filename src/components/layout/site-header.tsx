import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "../common/ThemeToggler";
import { IconBell, IconSearch } from "@tabler/icons-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

export function SiteHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 sticky top-0 z-40 rounded-t-xl">
      <div className="flex w-full items-center gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-1 hover:bg-accent transition-colors duration-200" />
          <Separator orientation="vertical" className="h-5 bg-border/50" />
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
            <p className="text-xs text-muted-foreground">
              Welcome back, manage your visitors
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
        </div>
      </div>
    </header>
  );
}
