import type { Metadata } from "next";
import { Geist, Geist_Mono, Google_Sans, UnifrakturMaguntia } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/components/providers/UserProvider";
import ConfigureAmplifyClientSide from "@/components/ConfigureAmplifyClientSide";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  display: 'swap',
});

const unifraktur = UnifrakturMaguntia({
  weight: "400",
  variable: "--font-unifraktur",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Warrantor — Protect What You Own",
  description: "Track warranties, get expiry alerts, and never miss a claim.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`bg-[var(--color-bg)] ${googleSans.className} text-[var(--color-text)]`}>
        <ConfigureAmplifyClientSide />
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
