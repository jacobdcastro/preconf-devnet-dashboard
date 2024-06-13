"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" className="dark bg-zinc-900">
        <body className={inter.className}>
          <div className="absolute h-screen w-screen z-0 pointer-events-none" />
          <div className="relative z-10">{children}</div>
          <ReactQueryDevtools />
        </body>
      </html>
    </QueryClientProvider>
  );
}
