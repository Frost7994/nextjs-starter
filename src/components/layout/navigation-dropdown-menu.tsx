"use client";

import Link from "next/link";

import { AlignRight } from "lucide-react";
import { useTheme } from "next-themes";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/utils/cn";

export const NavigationDropdownMenu = () => {
  //   theme destructure
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="size-8">
          <AlignRight className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">account</p>
            <p className="text-xs leading-none text-muted-foreground">tommybyrne9@gmail.com</p>
          </div>
        </DropdownMenuLabel>

        {/* docs */}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/docs/getting-started">
            <span>Getting started</span>
            <span className="ml-auto text-xs tracking-widest opacity-60">⇧⌘G</span>
          </Link>
        </DropdownMenuItem>

        {/* theme */}
        <DropdownMenuSeparator className="flex sm:hidden" />
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setTheme(isDark ? "light" : "dark");
          }}
          className="flex sm:hidden"
        >
          Toggle theme
          <DropdownMenuShortcut>⇧⌘T</DropdownMenuShortcut>
        </DropdownMenuItem>

        {/* auth button */}
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className={cn(
            buttonVariants(),
            "h-9 w-full focus:bg-primary/90 focus:text-primary-foreground"
          )}
        >
          Sign in
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
