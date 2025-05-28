"use client";
import AppLayout from "@/components/AppLayout";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark h-full bg-gray-100" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}

      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
