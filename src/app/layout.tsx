import { DM_Sans } from "next/font/google";

import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers";

import { cn } from "@/utils/cn";

import "@/styles/globals.css";

const font = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scrollbar-hide">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,
      <svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22>
      <text y=%22.9em%22 font-size=%2290%22>
      📦
      </text>
      </svg>"
        ></link>
      </head>
      <body className={cn("grid min-h-screen grid-rows-[auto_1fr] antialiased", font.className)}>
        <Providers>
          <Navbar />
          <main className="w-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
