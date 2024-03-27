"use client";

import { motion } from "framer-motion";

const currentYear = new Date().getFullYear();

export default function Copyright() {
  return (
    <motion.span
      className={"absolute bottom-3 left-1/2 -translate-x-1/2 text-xs z-50"} title={"Created by Mickaël Austoni"}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 0.7,
        transition: {
          delay: 5.5
        }
      }}
    >
      © {currentYear} Michael Sanchez
    </motion.span>
  );
}
