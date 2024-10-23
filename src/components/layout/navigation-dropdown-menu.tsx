"use client";

import { AlignRight } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const NavigationDropdownMenu = () => {
  const { data: session } = useSession();

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
            <p className="text-xs leading-none text-muted-foreground">
              {session ? session.user?.email : "johnsmith@example.com"}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="focus:bg-primary/90 focus:text-primary-foreground" asChild>
          <Button
            className="h-9 w-full"
            onClick={() => {
              if (session) {
                signOut();
              }

              if (!session) {
                signIn();
              }
            }}
          >
            {session ? "Sign out" : "Sign in"}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
