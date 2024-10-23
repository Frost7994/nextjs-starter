"use client";

// state
import { ReactNode, useEffect, useState } from "react";

// providers
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, useTheme } from "next-themes";

// components
import { Toaster } from "@/components/ui/sonner";

export const Providers = ({ children }: { children: ReactNode }) => {
  // state
  const [mounted, setMounted] = useState<boolean>(false);

  // effects
  useEffect(() => setMounted(true), []);

  // render
  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="dark" disableTransitionOnChange>
      <SessionProvider>{children}</SessionProvider>
      <ToasterProvider />
    </ThemeProvider>
  );
};

const ToasterProvider = () => {
  const { resolvedTheme } = useTheme();

  return <Toaster position="bottom-right" theme={resolvedTheme === "dark" ? "dark" : "light"} />;
};
