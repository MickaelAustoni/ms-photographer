"use client";

import Image from "next/image";
import {  useState } from "react";
import { motion, Variants } from "framer-motion";

interface FullScreenGalleryProps {
  images: string[];
}

const ANIMATION_DURATION = 2;
const THUMB_GAP = 30;
const THUMB_WIDTH = 250;
const THUMB_HEIGHT = 150;

const variants : Variants = {
  thumb: {
    opacity: 1,
    bottom: THUMB_GAP,
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    zIndex: 5
  },
  open: {
    opacity: 1,
    width: "100%",
    height: "100%",
    zIndex: 0,
    x: 0,
    y:0,
  },
  close: {
    opacity: [0, 1],
    bottom: THUMB_GAP,
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    zIndex: 5
  },
}

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

const getXOpen = (index: number) => {
  if (index === 0) {
    return THUMB_GAP;
  }

  return THUMB_GAP + (index * THUMB_WIDTH + index * THUMB_GAP);
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

  return images.map((src, index) => {
    const isSelectedImage = selectedImage === index;

    return <motion.div
      key={index}
      className={"select-none absolute z-10"}
      variants={{
        thumb: {
          opacity: 1,
          bottom: THUMB_GAP,
          width: THUMB_WIDTH,
          height: THUMB_HEIGHT,
          zIndex: 5,
          x: getXThumb(index, selectedImage)
        },
        open: {
          opacity: 1,
          width: "100%",
          height: "100%",
          zIndex: 0,
          x: [getXOpen(index), 0],
          y: [THUMB_GAP, 0],
        },
        close: {
          opacity: [0, 1],
          bottom: THUMB_GAP,
          width: THUMB_WIDTH,
          height: THUMB_HEIGHT,
          zIndex: 5
        },
      }}
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
