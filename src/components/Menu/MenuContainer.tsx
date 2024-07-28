"use client";

import { motion } from "framer-motion";
import { PropsWithChildren, useState } from "react";
import ButtonMenu from "@/components/Menu/ButtonMenu";
import NavMenu from "@/components/Menu/NavMenu";
import useSound from "@/hooks/useSound";

export default function MenuContainer({children}: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const { play : playCameraSound } = useSound("/sounds/camera.mp3");
  const { play : playClickSound } = useSound("/sounds/click.mp3");

  const handleOnClickBurger = () => {
    playClickSound().then()
    setIsOpen((prevState) => !prevState);

  }

  const handleClose = () => {
    playCameraSound().then()
    setIsOpen(false);
  }

  return (
    <>
      <ButtonMenu onClick={handleOnClickBurger} isOpen={isOpen}/>
      <NavMenu isOpen={isOpen} onClose={handleClose}/>
      <motion.div
        className={`w-full h-full ${isOpen ? "pointer-events-none" : "pointer-events-auto"}`}
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: {
            filter: "blur(0px)"
          },
          open: {
            filter: "blur(10px)"
          }
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
