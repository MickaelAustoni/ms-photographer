import FullScreenGallery from "@/components/FullScreenGallery";
import Title from "@/components/Title";


export default function Home() {
  return (
    <main className={"overflow-hidden w-full h-full"}>
      <Title />
      <FullScreenGallery images={[
        "/1.jpg",
        "/2.jpg",
        "/3.jpg",
        "/4.jpg",
        "/5.jpg",
      ]} />
    </main>
  );
}
