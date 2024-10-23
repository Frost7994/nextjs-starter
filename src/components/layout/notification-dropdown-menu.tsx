"use client";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";

export const NotificationDropdownMenu = () => {
  return (
    <Button size="icon" variant="outline" className="size-8">
      <Bell className="size-4" />
    </Button>
  );
};
