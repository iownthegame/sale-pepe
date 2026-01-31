import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import TabBar from "@/components/TabBar";
import ClientSideScrollRestorer from "@/ClientSideScrollRestorer";
import { Suspense } from "react";
import { AppProviders } from "@/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configure Poppins
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins', // This creates a CSS variable
});

export const metadata: Metadata = {
  title: "Sale Pepe",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased">
        <AppProviders>
          <Navbar />
          <main className="min-h-screen pt-16 pb-20">
            {children}
          </main>
          <TabBar />
        </AppProviders>
      </body>

      <Suspense>
        <ClientSideScrollRestorer />
      </Suspense>
    </html>
  );
}
