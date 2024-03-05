import FullScreenGallery from "@/components/FullScreenGallery";
import Title from "@/components/Title";
import Copyright from "@/components/Copyright";


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
        "/images/gallery/6.jpg",
        "/images/gallery/7.jpg",
        "/images/gallery/8.jpg",
        "/images/gallery/9.jpg"
      ]} />
      <Copyright />
    </main>
  );
}
