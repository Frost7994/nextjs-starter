import Link from "next/link";

import { NavigationDropdownMenu } from "@/components/layout/navigation-dropdown-menu";
import { ThemeDropdownMenu } from "@/components/layout/theme-dropdown-menu";

export const Navbar = () => {
  return (
    <header className="relative z-10 h-12 border-b">
      <div className="container flex h-full items-center justify-between">
        <Link href="/" className="text-lg font-medium">
          App
        </Link>
        <div className="flex items-center gap-x-1.5">
          <ThemeDropdownMenu />
          <NavigationDropdownMenu />
        </div>
      </div>
    </header>
  );
};
