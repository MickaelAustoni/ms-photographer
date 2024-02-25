"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";
import useWindowSize from "@/hooks/useWindowSize";

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

const getVariantName = (index: number, selectedImage: number) => {
  if (selectedImage === index) {
    return "open";
  }

  return "thumb";
}

export default function FullScreenGallery({ images }: FullScreenGalleryProps) {
  const { height } = useWindowSize();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAnimation, setIsAnimation] = useState(false);

  const handleClick = (index: number) => () => {
    if (selectedImage === index) {
      return;
    }

    setSelectedImage(index);
    setIsAnimation(true);
  };

  const variants = useMemo(()=>{
    return (index: number)=> {
      const x = getXThumb(index, selectedImage);
      const y = height - THUMB_HEIGHT - THUMB_GAP;

      return {
        thumb: {
          x,
          y,
          width: THUMB_WIDTH,
          height: THUMB_HEIGHT,
          zIndex: 20,
        },
        open: {
          x: 0,
          y: 0,
          width: "100%",
          height,
          zIndex: isAnimation ? 30 : 0,
          transitionEnd: {
            zIndex: 0,
          },
        },
      } as Variants
    }

  }, [height, isAnimation, selectedImage]);


  return <>
    <div className={"absolute pointer-events-none inset-0 z-10 bg-[url('/images/overlay.png')] bg-[length:4px_4px]"} />
    {images.map((src, index) => (
      <motion.div
        key={index}
        className="absolute"
        variants={variants(index)}
        animate={getVariantName(index, selectedImage)}
        onAnimationComplete={() => setIsAnimation(false)}
        transition={{
          duration: ANIMATION_DURATION
        }}
      >
        <motion.div
          className="absolute w-full h-full"
          animate={selectedImage !== index && isAnimation ? "fadeOut" : "fadeIn"}
          variants={{
            fadeIn: {
              opacity: 1,
              transition: {
                duration: ANIMATION_DURATION,
              },
            },
            fadeOut: {
              opacity: 0,
              transition: {
                duration: ANIMATION_DURATION,
              },
            },
          }}
        >
          <Image
            src={src}
            alt="placeholder"
            priority={true}
            height={1920}
            width={1080}
            className={`cursor-pointer w-full h-full object-cover`}
            onClick={handleClick(index)}
          />
        </motion.div>
      </motion.div>
    ))}
  </>
}
