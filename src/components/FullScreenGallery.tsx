"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSprings, animated } from "@react-spring/web";
import useWindowSize from "@/hooks/useWindowSize";

const IMAGE_GAP = 30;
const IMAGE_WIDTH = 280;
const IMAGE_HEIGHT = 150;

const getLeftTo = (index: number, selectedImage: number) => {
  if (selectedImage === index) {
    return 0;
  }

  if (index === 0) {
    return IMAGE_GAP;
  }

  if (index > selectedImage) {
    return (index - 1) * IMAGE_WIDTH + index * IMAGE_GAP;
  }

  if (index < selectedImage) {
    return index * IMAGE_WIDTH + (index + 1) * IMAGE_GAP;
  }

  return index * IMAGE_WIDTH + index * IMAGE_GAP;
};

const getLeftFrom = (index: number) => {
  if (index === 0) {
    return IMAGE_GAP;
  }

  return IMAGE_GAP + (index * IMAGE_WIDTH + index * IMAGE_GAP);
};

interface FullScreenGalleryProps {
  images: string[];
}

export default function FullScreenGallery({ images }: FullScreenGalleryProps) {
  const { height, width } = useWindowSize();
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const springs = useSprings(
    images.length,
    images.map((_, index) => {
      const isSelected = selectedImage === index;
      const parallaxX = isSelected && mousePosition.x ? Math.abs((mousePosition.x - width / 2) / 50) : 0;
      const parallaxY = isSelected && mousePosition.y ? Math.abs((mousePosition.y - height / 2) / 50) : 0;

      return {
        from: {
          bottom: IMAGE_GAP,
          left: getLeftFrom(index),
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
          zIndex: isSelected ? 0 : 5,
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
        },
        to: {
          bottom: isSelected ? 0 : IMAGE_GAP,
          width: isSelected ? width : IMAGE_WIDTH,
          height: isSelected ? height : IMAGE_HEIGHT,
          left: getLeftTo(index, selectedImage),
          zIndex: isSelected ? 0 : 5,
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
        },
      };
    })
  );

  const handleClick = (index: number) => () => {
    if (selectedImage === index) {
      return;
    }

    setSelectedImage(index);
  };

  return springs.map((style, index) => (
      <animated.div key={index} className={"select-none absolute z-10 origin-top"} style={style}>
        <Image
          src={images[index]}
          alt="placeholder"
          priority={true}
          height={1920}
          width={1080}
          className={`cursor-pointer w-full h-full object-cover${selectedImage === index ? " scale-105" : ""}`}
          onClick={handleClick(index)}
        />
      </animated.div>
    ));
}
