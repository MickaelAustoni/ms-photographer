"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PointerEvent } from "react";

interface FullScreenGalleryProps {
  images: string[];
}

const THUMB_ANIMATION_DURATION = 0.5;
const THUMB_GAP = 15;
const THUMB_WIDTH = 250;
const THUMB_HEIGHT = 150;
const THUMB_MASK_URL = "url(/images/mask-thumb.png)";
const SPRITE_MASK_URL = "url(/images/mask-sprite.png)";
const OVERFLOW_MASK_URL = "url(/images/mask-overflow.png)";
const SPRITE_ANIMATION_DURATION = 1.2;

const parallaxTransformer = (value: number) => {
  return -Math.abs(value / 100)
}

const ImageBackground = ({ src }: { src: string}) => {
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
  const [selectedImage, setSelectedImage] = useState(0);
  const [lastSelectedImage, setLastSelectedImage] = useState(-1);
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
      <ImageBackground src={images[selectedImage]} />
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
        WebkitAnimation: `forwards sprite-play ${SPRITE_ANIMATION_DURATION}s steps(83) forwards`,
        animation: "sprite-play 1s steps(83) forwards",
        scale: 1.1,
      }}
    >
      <ImageBackground src={lastSelectedImage === -1 ? images[images.length - 1] : images[lastSelectedImage]} />
    </motion.div>

    {/* Thumbnails */}
    <div
      className={"w-full overflow-x-auto absolute bottom-0 left-0 right-0 flex flex-row z-40"}
      style={{
        paddingRight: THUMB_WIDTH,
        maskImage: OVERFLOW_MASK_URL,
        WebkitMaskImage: OVERFLOW_MASK_URL,
        maskPosition: "right",
        WebkitMaskPosition: "left",
        maskSize: "100% 165px",
        WebkitMaskSize: "100% 165px",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
    }}
    >
      {images.map((src, index) => {
        return <motion.div
          key={index}
          animate={selectedImage === index ? "selected" : "thumb"}
          initial={false}
          whileHover={{
            scale: 1.05,
            transition:{
              duration: 0.3,
              type: "spring",
            }
          }}
          style={{
            width: THUMB_WIDTH,
            height: THUMB_HEIGHT,
            marginBottom: THUMB_GAP,
            flexShrink: 0,
            minWidth: 0,
          }}
          variants={{
            thumb: {
              opacity: 1,
              width: THUMB_WIDTH,
              marginLeft: THUMB_GAP,
            },
            selected: {
              opacity: 0,
              marginLeft: 0,
              width: 0,
            },
          }}
          transition={{
            duration: THUMB_ANIMATION_DURATION
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
                WebkitMaskSize: "100% 100%",
              }),
            }}
          />
        </motion.div>
      })}
    </div>
  </>
}
