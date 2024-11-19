import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Desafio Técnico | Coamo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} min-h-screen flex flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
