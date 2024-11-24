import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { PropsWithChildren } from "react";
import FullScreenGalleryProvider from "@/context/FullScreenGalleryProvider";
import MenuContainer from "@/components/Menu/MenuContainer";
import Title from "@/components/DataDisplay/Title";
import Copyright from "@/components/DataDisplay/Copyright";
import FollowMouseCursorPoint from "@/components/Utils/Utils/FollowMouseCursorPoint";

const inter = Montserrat({
  weight: ["100", "400", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Michael Sanchez - Photographe dans le Var",
  description: "Photographe professionnel dans le Var (83). Spécialisé en photographie de mariage, portrait, événementiel et architecture. Disponible à Toulon et dans toute la région PACA.",
};

export default function RootLayout({children}: PropsWithChildren) {
  return (
    <html lang="fr">
    <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png"/>
    <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png"/>
    <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png"/>
    <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png"/>
    <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png"/>
    <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png"/>
    <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png"/>
    <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png"/>
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png"/>
    <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png"/>
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
    <link rel="manifest" href="/favicon/manifest.json"/>
    <meta name="msapplication-TileColor" content="#ffffff"/>
    <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png"/>
    <meta name="theme-color" content="#ffffff"/>
    <body className={inter.className}>
    <main className={"overflow-hidden w-full h-full"}>
      <FullScreenGalleryProvider>
        <MenuContainer>
          <Title/>
          {children}
          <Copyright/>
        </MenuContainer>
        <FollowMouseCursorPoint/>
      </FullScreenGalleryProvider>
    </main>
    </body>
    </html>
  );
}
