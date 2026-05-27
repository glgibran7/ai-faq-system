import "./globals.css";

import { Inter } from "next/font/google";

import { Toaster } from "react-hot-toast";

import { Providers } from "@/components/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Sistem FAQ AI",
  description: "Sistem FAQ modern dengan AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <Providers>
          {children}

          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
