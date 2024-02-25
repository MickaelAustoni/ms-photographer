"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import useWindowSize from "@/hooks/useWindowSize";

interface FullScreenGalleryProps {
  images: string[];
}

const ANIMATION_DURATION = 0.5;
const THUMB_GAP = 30;
const THUMB_WIDTH = 250;
const THUMB_HEIGHT = 150;

const getThumbX = (index: number, selectedImage: number) => {
  if (index > selectedImage) {
    return (index - 1) * THUMB_WIDTH + index * THUMB_GAP;
  }

  if (index < selectedImage) {
    return index * THUMB_WIDTH + (index + 1) * THUMB_GAP;
  }

  return index * THUMB_WIDTH + index * THUMB_GAP;
};

export default function FullScreenGallery({ images }: FullScreenGalleryProps) {
  const { height } = useWindowSize();
  const [selectedImage, setSelectedImage] = useState(0);
  const [lastSelectedImage, setLastSelectedImage] = useState(0);

  const handleClick = (index: number) => () => {
    setLastSelectedImage(selectedImage);
    setSelectedImage(index);
  };

  return <>
    {/* Overlay */}
    <div className={"absolute pointer-events-none inset-0 z-30 bg-[url('/images/overlay.png')] bg-[length:4px_4px]"} />

    <div style={{ background: `url(/images/mask-sprite.png) no-repeat -9999px -9999px`}}>

      {/* Previous image */}
      <motion.div className={"absolute pointer-events-none inset-0 z-10"}>
        <Image
          src={images[2]}
          alt="Photo"
          height={1920}
          width={1080}
          className={"w-full h-full object-cover"}
        />
      </motion.div>

      {/* Selected image */}
      <div
        className={"mask-hide absolute pointer-events-none inset-0 z-20"}
      >
        <Image
          src={images[selectedImage]}
          alt="Photo"
          priority={true}
          height={1920}
          width={1080}
          className={"w-full h-full object-cover"}
        />
      </div>
    </div>

    {/* Thumbnails */}
    {images.map((src, index) => {
      const x = getThumbX(index, selectedImage);
      const y = height - THUMB_HEIGHT - THUMB_GAP;

      return <motion.div
        key={index}
        className="absolute z-50"
        animate={selectedImage === index ? "selected" : "thumb"}
        initial={false}
        style={{
          width: THUMB_WIDTH,
          height: THUMB_HEIGHT,
        }}
        variants={{
          thumb: {
            x,
            y,
            opacity: 1,
          },
          selected: {
            x,
            y,
            opacity: 0,
          },
        }}
        transition={{
          duration: ANIMATION_DURATION
        }}
      >
        <Image
          src={src}
          alt="Thumbnail"
          priority={index === 0}
          height={1920}
          width={1080}
          className={"cursor-pointer w-full h-full object-cover"}
          onClick={handleClick(index)}
          style={{
            ...(selectedImage !== index && {
              maskImage: "url(/images/mask-thumb.png)",
              WebkitMaskImage: "url(/images/mask-thumb.png)",
              maskSize: "100% 100%",
            }),
          }}
        />
      </motion.div>
    })}
  </>
}
