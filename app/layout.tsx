import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalshi Copy Trading Dashboard",
  description: "Premium copy trading dashboard for Kalshi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

