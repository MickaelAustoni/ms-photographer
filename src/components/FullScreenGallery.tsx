"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";

interface FullScreenGalleryProps {
  images: string[];
}

const ANIMATION_DURATION = 0.8;
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

const getVariantName = (index: number, selectedImage: number, lastSelectedImage: number) => {
  if (selectedImage === index) {
    return "open";
  }

  if (selectedImage === -1) {
    return "thumb";
  }

  if (index === lastSelectedImage) {
    return "close";
  }

  return "thumb";

}

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
          zIndex: 20,
          x: getXThumb(index, selectedImage),
          y: `calc(100vh - ${THUMB_HEIGHT + THUMB_GAP}px)`
        },
        open: {
          opacity: 1,
          width: "100%",
          height: "100%",
          zIndex: [20, 0],
          x: 0,
          y: 0
        },
        close : {
          opacity: [1, 0, 1],
          width: THUMB_WIDTH,
          height: THUMB_HEIGHT,
          zIndex: 20,
          x: getXThumb(index, selectedImage),
          y: `calc(100vh - ${THUMB_HEIGHT + THUMB_GAP}px)`
        },
      } as Variants
    }

  }, [selectedImage])

  return <>
    <div className={"absolute inset-0 z-10 bg-[url('/images/overlay.png')] bg-[length:4px_4px]"} />
    {images.map((src, index) => (
        <motion.div
          key={index}
          className={"select-none absolute"}
          variants={variants(index)}
          animate={getVariantName(index, selectedImage, lastSelectedImage)}
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
      ))}
  </>
}
