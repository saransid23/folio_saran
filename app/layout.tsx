import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppLayout from "./AppLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "AI Engineer & Full Stack Developer | Portfolio",
  description: "Portfolio of an AI Engineer and Full Stack Developer specializing in intelligent digital experiences, React, Next.js, and Machine Learning.",
  keywords: ["AI Engineer", "Full Stack Developer", "Frontend Developer", "Next.js", "React", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased min-h-full flex flex-col">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
