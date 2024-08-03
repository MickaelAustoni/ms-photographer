import FullScreenGallery from "@/components/DataDisplay/FullScreenGallery";
import { FullScreenGalleryContext } from "@/context/FullScreenGalleryProvider";

export default function Home() {
  return (
    <FullScreenGallery
      Context={FullScreenGalleryContext}
      images={[
        "/images/gallery/portrait/michael-sanchez-portrait.webp",
        "/images/gallery/sport/lotus.webp",
        "/images/gallery/mariage/marie-citroen-ds.webp",
        "/images/gallery/event/trompettiste.webp",
        "/images/gallery/portrait/femme-avion-assise.webp",
        "/images/gallery/sport/bmw-gs.webp",
        "/images/gallery/event/violoncelliste-soir.webp",
        "/images/gallery/portrait/femme-avion-regard-ciel.webp",
        "/images/gallery/event/violoncelliste-et-trompettiste.webp",
        "/images/gallery/portrait/femme-porche.webp",
        "/images/gallery/event/guitariste-saxophoniste.webp",
        "/images/gallery/event/trompettiste-et-saxophoniste.webp",
        "/images/gallery/mariage/mari-et-femme.webp",
        "/images/gallery/mariage/marie-voiture-ancienne.webp",
        "/images/gallery/sport/moto-femme.webp",
        "/images/gallery/mariage/marie-et-femme-embrasse.webp",
        "/images/gallery/mariage/marie-femme-crepuscule.webp",
        "/images/gallery/mariage/marie-femme.webp",
        "/images/gallery/sport/bmw-m2.webp",
        "/images/gallery/portrait/homme-et-femme.webp",
        "/images/gallery/sport/lotus-circuit.webp",
        "/images/gallery/mariage/marie-groupe.webp",
        "/images/gallery/portrait/femme-hangar.webp",
        "/images/gallery/event/violoncelliste-noir-et-blanc.webp",
        "/images/gallery/mariage/marie-et-femme-se-regardent.webp",
        "/images/gallery/sport/subaru.webp",
        "/images/gallery/portrait/femme-avion.webp",
        "/images/gallery/mariage/marie-et-femme-rocher-de-roquebrune.webp",
        "/images/gallery/mariage/marie-et-femme-se-regardent-voile.webp",
        "/images/gallery/event/saxophoniste.webp",
        "/images/gallery/event/violoncelliste-reflet.webp",
        "/images/gallery/event/guitariste.webp",
        "/images/gallery/event/duo-trompettiste.webp",
        "/images/gallery/sport/renault-clio.webp",
        "/images/gallery/event/saxophoniste-et-guitariste.webp",
        "/images/gallery/sport/moto.webp",
        "/images/gallery/event/guitariste-relfet.webp",
        "/images/gallery/mariage/jeune-marie.webp",
        "/images/gallery/portrait/femme-avion-ancien.webp"
      ]}/>
  );
}
