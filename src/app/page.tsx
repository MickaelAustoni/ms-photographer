"use client";

import Image from "next/image";
import { useState } from "react";
import { useSprings, animated } from "@react-spring/web";
import useWindowSize from "@/hooks/useWindowSize";

const IMAGES = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg",
];

const IMAGE_GAP = 20;
const IMAGE_WIDTH = 280;
const IMAGE_HEIGHT = 150;

const getLeftTo = (index: number, selectedImage: number) => {
  if(selectedImage === index){
    return 0;
  }

  if(index === 0){
    return IMAGE_GAP;
  }

  if(index > selectedImage){
    return (index - 1) * IMAGE_WIDTH + index * IMAGE_GAP;
  }

  if(index < selectedImage){
    return index * IMAGE_WIDTH + (index + 1) * IMAGE_GAP;
  }

  return index * IMAGE_WIDTH + index * IMAGE_GAP;
}

const getLeftFrom = (index: number, selectedImage: number) => {
  if(index === 0){
    return IMAGE_GAP;
  }

  return IMAGE_GAP + (index * IMAGE_WIDTH + index * IMAGE_GAP);
}

export default function Home() {
  const { height, width } = useWindowSize();
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const springs = useSprings(
    IMAGES.length,
    IMAGES.map((_, index) => ({
      from: {
        bottom:  IMAGE_GAP,
        left: getLeftFrom(index, selectedImage),
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        zIndex: selectedImage === index ? 0 : 1,
      },
      to: {
        bottom: selectedImage === index ? 0 : IMAGE_GAP,
        width: selectedImage === index ? width : IMAGE_WIDTH,
        height: selectedImage === index ? height : IMAGE_HEIGHT,
        left: getLeftTo(index, selectedImage),
        zIndex: selectedImage === index ? 0 : 1,
      },
    }))
  );

  const handleClick = (index: number) => ()=> {
    if(selectedImage === index){
      return;
    }

    setSelectedImage(index);
  };

  return (
    <main className={"overflow-hidden w-full h-full"}>
      <h1 className={"z-20 absolute text-7xl left-6 top-6"}>MICHAEL<br/><span className={"text-primary"}>SANCHEZ</span></h1>
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
