"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";

interface FullScreenGalleryProps {
  images: string[];
}

const ANIMATION_DURATION = 2;
const THUMB_GAP = 30;
const THUMB_WIDTH = 250;
const THUMB_HEIGHT = 150;

const getXThumb = (index: number, selectedImage: number) => {
  if (selectedImage === index) {
    return 0;
  }

  if (index === 0) {
    return THUMB_GAP;
  }

  if (index > selectedImage) {
    return (index - 1) * THUMB_WIDTH + index * THUMB_GAP;
  }

  if (index < selectedImage) {
    return index * THUMB_WIDTH + (index + 1) * THUMB_GAP;
  }

  return index * THUMB_WIDTH + index * THUMB_GAP;
};

export default function FullScreenGallery({ images }: FullScreenGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [lastSelectedImage, setLastSelectedImage] = useState(-1);

  const handleClick = (index: number) => () => {
    if (selectedImage === index) {
      return;
    }

    setLastSelectedImage(selectedImage);
    setSelectedImage(index);
  };

  const variants = useMemo(()=>{
    return (index: number)=> {
      return {
        thumb: {
          opacity: 1,
          width: THUMB_WIDTH,
          height: THUMB_HEIGHT,
          zIndex: 5,
          x: getXThumb(index, selectedImage),
          y: `calc(100vh - ${THUMB_HEIGHT + THUMB_GAP}px)`
        },
        open: {
          opacity: 1,
          width: "100%",
          height: "100%",
          zIndex: 0,
          x: 0,
          y: 0
        }
      } as Variants
    }

  }, [selectedImage])

  return images.map((src, index) => {
    const isSelectedImage = selectedImage === index;

    return <motion.div
      key={index}
      className={"select-none absolute"}
      variants={variants(index)}
      animate={isSelectedImage ? "open" : "thumb"}
      transition={{
        duration : ANIMATION_DURATION
      }}
      initial={{
        opacity: 0,
      }}
    >
      <Image
        src={src}
        alt="placeholder"
        priority={true}
        height={1920}
        width={1080}
        className={`cursor-pointer w-full h-full object-cover${selectedImage === index ? " scale-105" : ""}`}
        onClick={handleClick(index)}
      />
    </motion.div>
  });
}
