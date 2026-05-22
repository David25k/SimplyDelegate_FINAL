import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEO und KI Sichtbarkeit",
  description:
    "Zwei Premium-Service-Sektionen fuer SEO-Sichtbarkeit und KI-Antworten.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
