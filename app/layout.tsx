import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sishupal — India's First Fully Controllable AI Agent",
  description:
    "Built by Avasis. Sishupal is a voice-enabled, vision-capable, fully controllable AI agent that runs on your machine. Think Jarvis. Built in India.",
  keywords: [
    "AI agent",
    "controllable AI",
    "India",
    "Jarvis",
    "voice assistant",
    "Avasis",
    "open source",
  ],
  authors: [{ name: "Avasis", url: "https://avasis.ai" }],
  openGraph: {
    title: "Sishupal — India's First Fully Controllable AI Agent",
    description: "Think Jarvis. Built in India. By Avasis.",
    url: "https://sishupal.ai",
    siteName: "Sishupal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sishupal — India's First Fully Controllable AI Agent",
    description: "Think Jarvis. Built in India. By Avasis.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
