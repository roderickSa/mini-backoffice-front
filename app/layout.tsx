import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Space_Mono({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Home | Mini Backoffice",
    template: "%s | Mini Backoffice",
  },
  description: "Mini backoffice project app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
