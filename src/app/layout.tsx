import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import { ShoppingBasket } from 'lucide-react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FoodFlow | Order Management",
  description: "Sr. Full Stack Developer Assessment for RaftLabs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 font-black text-2xl text-orange-600 tracking-tight">
              <ShoppingBasket /> FoodFlow
            </div>
            <div className="text-sm font-medium text-slate-500 italic">Sr. Dev Assessment</div>
          </div>
        </nav>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}