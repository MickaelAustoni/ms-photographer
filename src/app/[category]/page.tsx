import FullScreenGallery from "@/components/DataDisplay/FullScreenGallery";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    category: "portrait" | "reportage" | "mariage" | string;
  };
}

const images = {
  "portrait": [
    "/images/gallery/1.jpg",
    "/images/gallery/2.jpg",
    "/images/gallery/3.jpg",
  ],
  "reportage": [
    "/images/gallery/4.jpg",
    "/images/gallery/5.jpg",
    "/images/gallery/6.jpg",
  ],
  "mariage": [
    "/images/gallery/7.jpg",
    "/images/gallery/8.jpg",
    "/images/gallery/9.jpg",
  ],
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  if (!(category in images)) {
    notFound();
  }

  return (
    <FullScreenGallery images={images[category as "portrait" | "reportage" | "mariage"]} />
  );
}
