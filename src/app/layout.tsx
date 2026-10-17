import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "@/styles/uber-move.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alto — Ship take-homes that feel like products",
  description:
    "Alto is a polished single-page demo kit for take-home interviews. Brand-first landing on Uber Base Web.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
