import  { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { PropsWithChildren } from "react";
import Gallery from "@/components/Layout/Gallery";

const inter = Montserrat({
  weight: ["100","400", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Michael Sanchez - Photographe",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Gallery>{children}</Gallery>
      </body>
    </html>
  );
}
