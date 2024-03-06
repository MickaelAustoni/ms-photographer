"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClickBurger = () => {
    setIsOpen((prevState)=> !prevState);
  }

  return (
    <>
      <motion.button
        className={"absolute right-6 top-6 p-5 z-40"}
        onClick={handleOnClickBurger}
        whileHover={{
          opacity: 0.8
        }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="24.9859"
          viewBox="0 0 25 24.9859"
        >
          <g>
            <motion.line
              y1="3"
              x2="25"
              y2="3"
              fill="none"
              stroke="#fff"
              strokeMiterlimit="10"
              strokeWidth="1"
              animate={isOpen ? "open" : "closed"}
              variants={{
                closed: {
                  rotate: 0,
                  pathLength: 0.6
                },
                open: {
                  rotate: 45,
                  y: 9.5,
                  pathLength: 1
                }
              }}
            />
          </g>
          <g>
            <motion.line
              y1="12.493"
              x2="25" y2="12.493"
              fill="none"
              stroke="#fff"
              strokeMiterlimit="10"
              strokeWidth="1"
              animate={isOpen ? "open" : "closed"}
              variants={{
                closed: {
                  opacity: 1
                },
                open: {
                  opacity: 0
                }
              }}
            />
          </g>
          <g>
            <motion.line
              y1="21.9859"
              x2="25"
              y2="21.9859"
              fill="none"
              stroke="#fff"
              strokeMiterlimit="10"
              strokeWidth="1"
              animate={isOpen ? "open" : "closed"}
              variants={{
                closed: {
                  rotate: 0,
                  pathLength: 0.8
                },
                open: {
                  rotate: -45,
                  y: -9.5,
                  pathLength:1
                }
              }}
            />
          </g>
        </motion.svg>
      </motion.button>
      <motion.div/>
    </>
  );
}
