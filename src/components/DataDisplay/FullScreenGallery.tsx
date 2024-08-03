"use client";

import Image from "next/image";
import { Context, createContext, ElementRef, useContext, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { PointerEvent } from "react";
import ScrollIndicator from "@/components/Indicator/ScrollIndicator";
import useSound from "@/hooks/useSound";

const ContextFallback = createContext<{
  intro: boolean;
  setIntro: (bool: boolean) => void;
}>({
  intro: true,
  setIntro: (bool: boolean) => {
  },
});

interface FullScreenGalleryProps {
  images: string[];
  Context?: Context<{
    intro: boolean;
    setIntro: (bool: boolean) => void;
  }>
}

const THUMB_GAP = 15;
const THUMB_MASK_URL = "url(/images/mask/mask-thumb.webp)";
const THUMB_OVERFLOW_MASK_URL = "url(/images/mask/mask-thumb-overflow.webp)";
const SPRITE_MASK_URL = "url(/images/sprite/mask-sprite-1.png)";
const PARALLAX_MULTIPLIER = 200;
const SELECTED_IMAGE_DURATION = 2;
const THUMB_ANIMATION_DURATION = 0.5;
const THUMB_VARIANT_TRANSITION_DURATION = 2.5;
const SPRITE_ANIMATION_DURATION = 1.2;

const parallaxTransformer = (value: number) => {
  return -Math.abs(value / PARALLAX_MULTIPLIER)
}

const ImageBackground = ({src}: { src: string }) => {
  return (
    <Image
      priority
      fill
      sizes="100vw"
      src={src}
      alt="Background"
      className={"w-full h-full object-cover pointer-events-none"}
    />
  );
}

const ThumbnailImage = ({src, priority, alt}: { src: string, priority: boolean, alt: string }) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <div role="status" className="z-10 absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
        <svg aria-hidden="true"
             className="inline w-8 h-8 animate-spin fill-white text-black"
             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"/>
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>}
      <Image
        fill
        sizes={"100%"}
        src={src}
        alt={alt}
        priority={priority}
        className={"w-full h-full object-cover pointer-events-none"}
        onLoad={() => setLoading(false)}
        style={{
          maskImage: THUMB_MASK_URL,
          WebkitMaskImage: THUMB_MASK_URL,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      />
    </>
  );
}

export default function FullScreenGallery({images, Context = ContextFallback}: FullScreenGalleryProps) {
  const [selectedImageIndex, setsSelectedImageIndex] = useState(0);
  const [beforeLastSelectedImageIndex, setBeforeLastSelectedImageIndex] = useState(-1);
  const [intro, setIntro] = useState(true);
  const [scrollIndicator, setScrollIndicator] = useState(true);
  const [transition, setTransition] = useState(false);
  const {play: playSoundWhoosh} = useSound("/sounds/transition.mp3", 0.05);
  const {intro: introContext, setIntro: setIntroContext} = useContext(Context);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(useTransform(mouseX, parallaxTransformer));
  const smoothY = useSpring(useTransform(mouseY, parallaxTransformer));
  const thumbContainerRef = useRef<ElementRef<"div">>(null);
  const {scrollYProgress: scrollYProgressThumbContainer} = useScroll({container: thumbContainerRef});
  const selectedImageSrc = images[selectedImageIndex];
  const maskSrc = beforeLastSelectedImageIndex === -1 ? "" : images[beforeLastSelectedImageIndex];
  const indicatorOpacity = useSpring(useTransform(scrollYProgressThumbContainer, [0, 0.05], [1, 0]));
  const isIntro = introContext !== undefined ? introContext : intro;
  const variant = transition ? "transition" : isIntro ? "intro" : "normal";

  const handleClick = (index: number) => () => {
    if (index === selectedImageIndex || transition) {
      return;
    }

    playSoundWhoosh();
    setBeforeLastSelectedImageIndex(selectedImageIndex);
    setsSelectedImageIndex(index);
    setTransition(true);
  };

  const handlePointerMove = (e: PointerEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }

  const handleOnAnimationComplete = (variantName: string) => {
    if (variantName === "intro") {
      setIntro(false);
      setIntroContext(false);
      return
    }

    if (variantName === "transition") {
      setTransition(false);
    }
  }

  useMotionValueEvent(indicatorOpacity, "change", (opacity) => {
    if (opacity <= 0 && !isIntro) {
      setScrollIndicator(false);
    }
  })

  // Hide scroll indicator when reaching the end of the thumbnails
  useEffect(() => {
    const unsubscribeIndicatorOpacity = indicatorOpacity.on("change", (opacity) => {
      if (opacity <= 0 && !isIntro) {
        setScrollIndicator(false);
      }
    });

    const unsubscribeScrollYProgressThumbContainer = scrollYProgressThumbContainer.on("change", (scroll) => {
      if (scroll >= 1) {
        setScrollIndicator(false);
      }
    });

    return () => {
      unsubscribeIndicatorOpacity()
      unsubscribeScrollYProgressThumbContainer()
    }
  }, [indicatorOpacity, isIntro, scrollYProgressThumbContainer]);

  return (
    <motion.div onPointerMove={handlePointerMove}>
      {/* Overlay dot */}
      <div className={"absolute pointer-events-none inset-0 z-30 bg-[url('/images/overlay.png')] bg-[length:4px_4px]"}/>

      {/* Selected image background */}
      <motion.div
        className={"absolute inset-0 z-10"}
        style={{
          y: smoothY,
          x: smoothX,
        }}
      >
        <ImageBackground src={selectedImageSrc}/>
      </motion.div>

      {/* Mask image */}
      <motion.div
        key={`${selectedImageIndex}-mask`}
        className={"absolute pointer-events-none inset-0 z-20"}
        style={{
          x: smoothX,
          y: smoothY,
          WebkitMask: SPRITE_MASK_URL,
          mask: SPRITE_MASK_URL,
          WebkitMaskSize: "8400% 100%",
          maskSize: "8400% 100%",
          WebkitAnimation: `sprite-play ${SPRITE_ANIMATION_DURATION}s steps(83) forwards`,
          animation: `sprite-play ${SPRITE_ANIMATION_DURATION}s steps(83) forwards`,
        }}
      >
        <ImageBackground src={maskSrc || selectedImageSrc}/>
      </motion.div>


      {/* Thumbnails */}
      <div
        className={"justify-end absolute top-0 bottom-0 right-0 flex flex-col z-40 before:z-50 before:pointer-events-none before:bottom-0 before:right-0 before:fixed before:w-64 before:bg-gradient-to-b before:from-transparent before:to-black"}>

        {/* Scroll Indicator */}
        <AnimatePresence>
          {scrollIndicator && <motion.div
            animate={variant}
            variants={{
              intro: {opacity: 0},
              normal: {opacity: 1},
              transition: {opacity: 0}
            }}
            transition={{delay: 1}}
            style={{opacity: indicatorOpacity}}>
            <ScrollIndicator style={{marginTop: "10%"}} className={"-translate-x-1/2 left-1/2"}/>
          </motion.div>}
        </AnimatePresence>

        <div
          ref={thumbContainerRef}
          className={"overflow-y-auto px-3 sm:px-4 md:px-6"}
          style={{
            paddingTop: "35%",
            paddingBottom: "35%",
            maskImage: THUMB_OVERFLOW_MASK_URL,
            maskSize: "100% 100%",
            height: "70%",
          }}
        >
          {images.map((src, index) => {
            const isSelected = selectedImageIndex === index;
            const imageName = src.split("/").pop()?.split(".")[0] || "Thumbnail";

            return <motion.div
              key={src + index}
              onClick={handleClick(index)}
              animate={variant}
              onAnimationComplete={handleOnAnimationComplete}
              className={"cursor-pointer relative w-32 h-20 sm:w-40 sm:h-24 md:w-64 md:h-36"}
              style={{
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
                transition: {
                  opacity: [1, 0, 0],
                  scale: isSelected ? [1, 1.2, 1] : 1,
                  x: ["0%", "5%", "100%", "100%", "100%", "0%"],
                  rotateY: [0, 90, 0],
                  rotateZ: [0, 30, 0],
                  rotateX: [0, 90, 0],
                  transition: {
                    duration: THUMB_VARIANT_TRANSITION_DURATION,
                    delay: isSelected ? 0 : 0.2,
                  },
                },
                normal: {
                  opacity: 1,
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
              <ThumbnailImage src={src} alt={imageName} priority={index <= 3}/>
            </motion.div>
          })}
        </div>
      </div>
    </motion.div>
  );
}
