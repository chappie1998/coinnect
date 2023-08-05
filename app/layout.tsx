import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Mobile from "./component/mobile";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coinnect",
  description: "Token Launchpad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     <body className={inter.className}>
        <div className="hidden lg:block">
        {children}
        </div>
        <div className="lg:hidden">
          <Mobile />    
        </div>
      </body>
    </html>
  );
}
