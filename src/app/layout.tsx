import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { ReactNode } from "react";

const inter = Montserrat({
  weight: ["400", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Michael Sanchez - Photographe",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
