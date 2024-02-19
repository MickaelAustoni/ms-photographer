"use client";

import Image from "next/image";
import { useState } from "react";
import { useSprings, animated } from "@react-spring/web";

const IMAGES = [
  "/image-1.jpg",
  "/image-2.jpg",
  "/image-3.jpg",
];

const IMAGE_GAP = 10;
const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 200;

const getLeftTo = (index: number, selectedImage: number |null) => {
  const isSelectedImage = selectedImage === index;

  if(isSelectedImage){
    return 0
  }

  if(selectedImage === null){
    if(index === 0){
      return IMAGE_GAP;
    }
    return index * IMAGE_WIDTH + index * IMAGE_GAP;
  }

  if(index === 0){
    return IMAGE_GAP;
  }

  if(index > selectedImage){
    return (index - 1) * IMAGE_WIDTH + index * IMAGE_GAP;
  }

  return index * IMAGE_WIDTH + index * IMAGE_GAP;
}

const getLeftFrom = (index: number, selectedImage: number |null) => {
  if(index === 0){
    return IMAGE_GAP;
  }


  return IMAGE_GAP + (index * IMAGE_WIDTH + index * IMAGE_GAP);

}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const springs = useSprings(
    IMAGES.length,
    IMAGES.map((_, index) => ({
      from: {
        bottom: IMAGE_GAP,
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        left: getLeftFrom(index, selectedImage),
        zIndex: selectedImage === index ? 0 : 1,
      },
      to: {
        bottom: selectedImage === index ? 0 : IMAGE_GAP,
        width: selectedImage === index ? window.innerWidth : IMAGE_WIDTH,
        height: selectedImage === index ? window.innerHeight : IMAGE_HEIGHT,
        left: getLeftTo(index, selectedImage),
        zIndex: selectedImage === index ? 0 : 1,
      },
    }))
  );

  const handleClick = (index: number) => ()=> {
    setSelectedImage(index);
  };

  return (
    <main className={"overflow-hidden w-full h-full"}>
      {springs.map((style, index) => (
        <animated.div key={index} className={"select-none absolute z-10"} style={style}>
          <Image
            src={IMAGES[index]}
            alt="placeholder"
            priority={true}
            height={1920}
            width={1080}
            className={"cursor-pointer w-full h-full object-cover"}
            onClick={handleClick(index)}
          />
        </animated.div>
      ))}
    </main>
  );
}
