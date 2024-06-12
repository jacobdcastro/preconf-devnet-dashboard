import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Preconfirmation Devnet Dashboard",
  description: "A dashboard to monitor the transaction supply chain for based sequencing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark bg-dark-gradient bg-center bg-cover'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
