import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import { Roboto } from 'next/font/google';

const roboto = Roboto({weight:'400', subsets:['latin']});

export const metadata: Metadata = {
  title: "Expense-Tracker",
  description: "Track Your Expenses and Create a Budget",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={roboto.className}>
        Header or Navbar 
       <main>{children}</main>
      </body>
    </html>
    </ClerkProvider>
  );
}
