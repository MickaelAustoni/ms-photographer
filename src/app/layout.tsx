import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { PropsWithChildren } from "react";
import FullScreenGalleryProvider from "@/context/FullScreenGalleryProvider";
import MenuContainer from "@/components/Menu/MenuContainer";
import Title from "@/components/DataDisplay/Title";
import Copyright from "@/components/DataDisplay/Copyright";

const inter = Montserrat({
  weight: ["100", "400", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Michael Sanchez - Photographe",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

export default function RootLayout({children}: PropsWithChildren) {
  return (
    <html lang="fr">
    <body className={inter.className}>
    <main className={"overflow-hidden w-full h-full"}>
      <FullScreenGalleryProvider>
        <MenuContainer>
          <Title/>
          {children}
          <Copyright/>
        </MenuContainer>
      </FullScreenGalleryProvider>
    </main>
    </body>
    </html>
  );
}
