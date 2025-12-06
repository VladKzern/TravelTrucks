import { ReactNode } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";

const inter = Inter({
  variable: '--font-family',
  subsets: ['latin'],
});

export default function RootLayout({ children, }: { children: ReactNode; }) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}