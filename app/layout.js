import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CartToast, { MobileCartBar } from "@/components/CartToast";

const vazirmatn = localFont({
  src: [
    { path: "../public/fonts/vazirmatn-300.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/vazirmatn-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/vazirmatn-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/vazirmatn-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata = {
  title: "کافه‌یار | منوی آنلاین و سفارش",
  description:
    "منوی آنلاین کافه‌یار: قهوه‌ی تازه، نوشیدنی سرد، دمنوش، شیرینی و کیک. سفارش حضوری و بیرون‌بر با تحویل سریع.",
  keywords: ["کافه", "منو آنلاین", "سفارش قهوه", "کافه‌یار", "منوی کافه"],
  openGraph: {
    title: "کافه‌یار | منوی آنلاین و سفارش",
    description: "منوی کامل کافه را ببین، سفارش بده و سر میز تحویل بگیر.",
    locale: "fa_IR",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#3B2418",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="min-h-screen overflow-x-hidden bg-cream">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <CartToast />
          <MobileCartBar />
        </CartProvider>
      </body>
    </html>
  );
}
