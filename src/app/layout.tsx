import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Navbar from "@/components/layout/Navbar";
import CategoryBar from "@/components/layout/CategoryBar";
import Footer from "@/components/layout/Footer";
import SearchModal from "@/components/common/SearchModal";
import CartDrawer from "@/components/common/CartDrawer";
import QuickViewModal from "@/components/common/QuickViewModal";
import AuthModal from "@/components/common/AuthModal";
import ToastContainer from "@/components/common/ToastContainer";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kretabazaar :: Custom Product Marketplace & Store",
  description: "Discover & buy custom studio products, audiophile acoustics, digital Figma assets, titanium EDC gear, and streetwear apparel on Kretabazaar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontSans.variable} h-full antialiased`}>
      <body className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans min-h-full flex flex-col selection:bg-blue-600 selection:text-white">
        <StoreProvider>
          <Navbar />
          <CategoryBar />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Interactive Modals & Drawers */}
          <SearchModal />
          <CartDrawer />
          <QuickViewModal />
          <AuthModal />
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}
