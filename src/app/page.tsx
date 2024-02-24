import FullScreenGallery from "@/components/FullScreenGallery";
import Title from "@/components/Title";


export default function Home() {
  return (
    <main className={"overflow-hidden w-full h-full"}>
      <Title />
      <FullScreenGallery images={[
        "/images/gallery/1.jpg",
        "/images/gallery/2.jpg",
        "/images/gallery/3.jpg",
        "/images/gallery/4.jpg",
        "/images/gallery/5.jpg",
      ]} />
    </main>
  );
}
