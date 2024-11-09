import type { Metadata } from "next";
import {Providers} from '@/app/providers'
import "./globals.css";
import { Roboto } from 'next/font/google';
import Layout from '@/components/layout/Design'
import { Deserializer } from "node:v8";
import Design from "@/components/layout/Design";
import { connectToMongoDB } from "@/lib/mongodb";


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
  connectToMongoDB()
  return (
    
      
        <html lang="en">
          <body className={roboto.className}>
            <Providers>
            <Design>{children}</Design>
            </Providers>
          </body>
        </html>
     
    
  );
}
