"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import useWindowSize from "@/hooks/useWindowSize";
import { PointerEvent } from "react";

interface FullScreenGalleryProps {
  images: string[];
}

const ANIMATION_DURATION = 0.5;
const THUMB_GAP = 10;
const THUMB_WIDTH = 250;
const THUMB_HEIGHT = 150;
const SPRITE_MASK_URL = "url(/images/mask-sprite.png)";
const THUMB_MASK_URL = "url(/images/mask-thumb.png)";

const getThumbX = (index: number, selectedImage: number) => {
  if (index > selectedImage) {
    return (index - 1) * THUMB_WIDTH + index * THUMB_GAP;
  }

  if (index < selectedImage) {
    return index * THUMB_WIDTH + (index + 1) * THUMB_GAP;
  }

  return index * THUMB_WIDTH + index * THUMB_GAP;
};

const parallaxTransformer = (value: number) => {
  return -Math.abs(value / 100)
}

const ImageFull = ({ src }: { src: string }) => {
  return <Image
    src={src}
    alt="Photo"
    height={1920}
    width={1080}
    className={"w-full h-full object-cover"}
    priority={true}
  />
}

export default function FullScreenGallery({ images }: FullScreenGalleryProps) {
  const { height } = useWindowSize();
  const [selectedImage, setSelectedImage] = useState(0);
  const [lastSelectedImage, setLastSelectedImage] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(useTransform(mouseX, parallaxTransformer));
  const smoothY = useSpring(useTransform(mouseY, parallaxTransformer));

  const handleClick = (index: number) => () => {
    setLastSelectedImage(selectedImage);
    setSelectedImage(index);
  };

  const handlePointerMove = (e: PointerEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }

  return <>
    {/* Overlay */}
    <div className={"absolute pointer-events-none inset-0 z-30 bg-[url('/images/overlay.png')] bg-[length:4px_4px]"} />

    {/* Selected image */}
    <motion.div
      className={"absolute inset-0 z-10"}
      onPointerMove={handlePointerMove}
      style={{
        y: smoothY,
        x: smoothX,
        scale: 1.1,
      }}
    >
      <ImageFull src={images[selectedImage]} />
    </motion.div>

    {/* Mask image with */}
    <motion.div
      key={selectedImage}
      className={"absolute pointer-events-none inset-0 z-20"}
      style={{
        x: smoothX,
        y: smoothY,
        WebkitMask: SPRITE_MASK_URL,
        mask: SPRITE_MASK_URL,
        WebkitMaskSize: "8400% 100%",
        maskSize: "8400% 100%",
        WebkitAnimation: "sprite-play 1.4s steps(83) forwards",
        animation: "sprite-play 1.4s steps(83) forwards",
        scale: 1.1,
      }}
    >
      <ImageFull src={images[lastSelectedImage]} />
    </motion.div>

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
              maskImage: THUMB_MASK_URL,
              WebkitMaskImage: THUMB_MASK_URL,
              maskSize: "100% 100%",
            }),
          }}
        />
      </motion.div>
    })}
  </>
}
