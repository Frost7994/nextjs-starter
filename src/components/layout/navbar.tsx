import Link from "next/link";

import { Rocket } from "lucide-react";

import { NavigationDropdownMenu } from "@/components/layout/navigation-dropdown-menu";
import { NotificationDropdownMenu } from "@/components/layout/notification-dropdown-menu";
import { ThemeDropdownMenu } from "@/components/layout/theme-dropdown-menu";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/utils/cn";

export const Navbar = () => {
  return (
    <header className="relative z-10 h-12 border-b">
      <div className="container flex h-full items-center justify-between">
        <Link href="/" className="text-lg font-medium">
          MED<span className="text-brand">IQ</span>LY
        </Link>
        <div className="flex items-center gap-x-1.5">
          <NotificationDropdownMenu />
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "size-8")}>
            <Rocket className="size-4" />
          </Link>
          <ThemeDropdownMenu />
          <NavigationDropdownMenu />
        </div>
      </div>
    </header>
  );
};
