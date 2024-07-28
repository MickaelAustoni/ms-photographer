"use client";

import Image from "next/image";
import { Context, createContext, ElementRef, useContext, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { PointerEvent } from "react";
import ScrollIndicator from "@/components/Indicator/ScrollIndicator";

const ContextFallback = createContext<{
  intro: boolean;
  setIntro: (bool: boolean) => void;
}>({
  intro: true,
  setIntro: () => {
  }
});

interface FullScreenGalleryProps {
  images: string[];
  Context?: Context<{ intro: boolean; setIntro: (bool: boolean) => void }>
}

const THUMB_GAP = 15;
const THUMB_WIDTH = 250;
const THUMB_HEIGHT = 150;
const THUMB_MASK_URL = "url(/images/mask/mask-thumb.webp)";
const THUMB_OVERFLOW_MASK_URL = "url(/images/mask/mask-thumb-overflow.webp)";
const SPRITE_MASK_URL = "url(/images/sprite/mask-sprite-1.png)";
const PARALLAX_MULTIPLIER = 200;
const SELECTED_IMAGE_DURATION = 2;
const THUMB_ANIMATION_DURATION = 0.5;
const SPRITE_ANIMATION_DURATION = 1.2;
const MASK_IMAGE_TRANSITION_DURATION = SELECTED_IMAGE_DURATION * 2

const parallaxTransformer = (value: number) => {
  return -Math.abs(value / PARALLAX_MULTIPLIER)
}

const ImageBackground = ({src}: { src: string }) => {
  return <Image
    fill
    sizes="100vw"
    src={src}
    alt="Background"
    className={"w-full h-full object-cover pointer-events-none"}
    priority={true}
  />
}

export default function FullScreenGallery({images, Context = ContextFallback}: FullScreenGalleryProps) {
  const [selectedImageIndex, setsSelectedImageIndex] = useState(0);
  const [beforeLastSelectedImageIndex, setBeforeLastSelectedImageIndex] = useState(-1);
  const [intro, setIntro] = useState(true);
  const {intro: introContext, setIntro: setIntroContext} = useContext(Context);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(useTransform(mouseX, parallaxTransformer));
  const smoothY = useSpring(useTransform(mouseY, parallaxTransformer));
  const thumbContainerRef = useRef<ElementRef<"div">>(null);
  const {scrollYProgress: scrollYProgressThumbContainerRef} = useScroll({container: thumbContainerRef});
  const selectedImageSrc = images[selectedImageIndex];
  const maskSrc = beforeLastSelectedImageIndex === -1 ? "" : images[beforeLastSelectedImageIndex];
  const indicatorOpacity = useSpring(useTransform(scrollYProgressThumbContainerRef, [0, 0.05], [1, 0]));
  const isIntro = introContext !== undefined ? introContext : intro

  const handleClick = (index: number) => () => {
    setBeforeLastSelectedImageIndex(selectedImageIndex);
    setsSelectedImageIndex(index);
  };

  const handlePointerMove = (e: PointerEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }

  const handleOnAnimationComplete = (variantName: string) => {
    if (variantName === "intro") {
      setIntro(false);
      setIntroContext(false);
    }
  }


  return (
    <motion.div onPointerMove={handlePointerMove}>
      {/* Overlay dot */}
      <div className={"absolute pointer-events-none inset-0 z-30 bg-[url('/images/overlay.png')] bg-[length:4px_4px]"}/>

      {/* Selected image background */}
      <motion.div
        key={selectedImageSrc}
        className={"absolute inset-0 z-10"}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: SELECTED_IMAGE_DURATION}}
        style={{
          y: smoothY,
          x: smoothX,
          scale: 1.1,
        }}
      >
        <ImageBackground src={selectedImageSrc}/>
      </motion.div>

      {/* Mask image */}
      <motion.div
        key={selectedImageIndex}
        className={"absolute pointer-events-none inset-0 z-20"}
        initial={{
          opacity: 1
        }}
        animate={{
          opacity: 0
        }}
        transition={{
          duration: MASK_IMAGE_TRANSITION_DURATION
        }}
        style={{
          x: smoothX,
          y: smoothY,
          WebkitMask: SPRITE_MASK_URL,
          mask: SPRITE_MASK_URL,
          WebkitMaskSize: "8400% 100%",
          maskSize: "8400% 100%",
          WebkitAnimation: `sprite-play ${SPRITE_ANIMATION_DURATION}s steps(83) forwards`,
          animation: `sprite-play ${SPRITE_ANIMATION_DURATION}s steps(83) forwards`,
          scale: 1.1,
        }}
      >
        {maskSrc && <ImageBackground src={maskSrc}/>}
      </motion.div>


      {/* Thumbnails */}
      <div
        className={"items-center absolute bottom-0 right-0 flex flex-col z-40 before:z-50 before:pointer-events-none before:bottom-0 before:right-0 before:fixed before:w-64 before:bg-gradient-to-b before:from-transparent before:to-black"}>

        {/* Scroll Indicator */}
        <motion.div
          animate={isIntro ? "intro" : "normal"}
          variants={
            {
              intro: {
                opacity: 0,
              },
              normal: {
                opacity: 1,
              },
            }
          }
          transition={{
            delay: 1
          }}
          style={{
            opacity: indicatorOpacity,
          }}>
          <ScrollIndicator style={{ marginTop: "10%" }} className={"-translate-x-1/2 left-1/2"}/>
        </motion.div>

        <div
          ref={thumbContainerRef}
          className={"overflow-auto px-6"}
          style={{
            paddingTop: "35%",
            paddingBottom: "35%",
            height: THUMB_HEIGHT * 5,
            maskImage: THUMB_OVERFLOW_MASK_URL,
            WebkitMaskImage: THUMB_OVERFLOW_MASK_URL,
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
          }}
        >
          {images.map((src, index) => {
            const isSelected = selectedImageIndex === index;
            const imageName = src.split("/").pop()?.split(".")[0] || "Thumbnail";

            return <motion.div
              key={src + index}
              onClick={handleClick(index)}
              animate={isIntro ? "intro" : "thumb"}
              onAnimationComplete={handleOnAnimationComplete}
              className={"cursor-pointer relative"}
              style={{
                width: THUMB_WIDTH,
                height: THUMB_HEIGHT,
                marginBottom: THUMB_GAP,
                flexShrink: 0,
                minWidth: 0,
              }}
              initial={{
                opacity: 0,
                x: 20,
                scale: 0.6,
              }}
              variants={{
                intro: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: {
                    delay: 5 + index * 0.1,
                    scale: {
                      duration: 0.1,
                    }
                  },
                },
                thumb: {
                  opacity: 1,
                  width: THUMB_WIDTH,
                  height: THUMB_HEIGHT,
                  marginBottom: THUMB_GAP,
                  scale: 1,
                  x: 0,
                },
              }}
              transition={{
                duration: THUMB_ANIMATION_DURATION
              }}
              whileHover={{
                scale: 1.05,
                transition: {
                  duration: 0.3,
                  type: "tween",
                }
              }}
            >
              {/* Box shadow effect */}
              <motion.div
                className={"inset-2 absolute"}
                animate={isSelected ? "selected" : "unselected"}
                transition={{
                  duration: SELECTED_IMAGE_DURATION,
                }}
                variants={
                  {
                    unselected: {
                      boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0)",
                    },
                    selected: {
                      boxShadow: "0 0 10px 5px rgba(255, 255, 255, 1)",
                    },
                  }
                }
              />
              <Image
                width={THUMB_WIDTH}
                height={THUMB_HEIGHT}
                src={src}
                alt={imageName}
                priority={index === 0 || index === 1}
                className={"w-full h-full object-cover pointer-events-none"}
                style={{
                  maskImage: THUMB_MASK_URL,
                  WebkitMaskImage: THUMB_MASK_URL,
                  maskSize: "100% 100%",
                  WebkitMaskSize: "100% 100%",
                }}
              />
            </motion.div>
          })}
        </div>
      </div>
    </motion.div>
  );
}
