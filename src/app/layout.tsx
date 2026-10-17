import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import "@/styles/uber-move.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Common Ground — Virtual community events that feel familiar",
  description:
    "Mobile-first Common Ground: sign up, set up your profile, and join virtual community events. Built with Uber Base Web and Uber Move.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F3EDE4",
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
