import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/providers/toast-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Latest AI, Blockchain, and Web3 Jobs | Discover Cutting-Edge Career Opportunities",
  description: "Wukong Hiring is the leading future-proof job platform connecting top talent and hiring managers in AI, Web3, Blockchain, smart contracts, and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          {children}
          <ToastProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
