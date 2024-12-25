import type { Metadata } from "next";
import { Recursive, Roboto } from 'next/font/google'
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster"
import Providers from "@/components/Providers";
import { Toaster as SnToaster } from "@/components/ui/sonner"
import { CartProvider } from '@/components/context/CartContext';

const recursive = Recursive({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={recursive.className}>
        <NavBar />

        <main className='flex bg-white flex-col min-h-[calc(100vh-3.5rem-1px)]'>
          <div className='flex-1 flex flex-col h-full'>
            <Providers>
              <CartProvider>
                {children}
              </CartProvider>
            </Providers>
          </div>
          <Footer />
        </main>

        <Toaster />
        <SnToaster />
      </body>
    </html >
  );
}
