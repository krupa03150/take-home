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
      <head>
        <link
          rel="preload"
          href="/fonts/UberMove-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/UberMoveText-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/UberMoveText-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className="min-h-full flex flex-col font-sans"
        data-alto-font="UberMoveText"
        style={{
          fontFamily:
            'UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
