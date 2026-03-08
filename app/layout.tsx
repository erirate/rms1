import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "RateMySitter — Find Trusted Babysitters",
  description: "Read and leave reviews for babysitters in your area. Community-powered trust for parents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
