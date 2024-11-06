import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'

import "./globals.css";
import { Roboto } from 'next/font/google';
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'


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
            <Navbar />
            <main>{children}</main>
            <Footer />
          </body>
        </html>
     
    </ClerkProvider>
  );
}
