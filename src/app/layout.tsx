import { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toast";

import { cn } from "@/utils/cn";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Starter Template",
    template: "Starter Template | %s",
  },
  description: "A starter template for Next.js 14 with TailwindCSS and Shadcn UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        "hide-scrollbar"
      )}
    >
      <body suppressHydrationWarning>
        <ThemeProvider>
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
