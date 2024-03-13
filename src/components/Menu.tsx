"use client";

import { motion } from "framer-motion";
import { PropsWithChildren, useState } from "react";

const Button = ({onClick, isOpen}: { onClick: () => void; isOpen: boolean }) => {
  return (
    <motion.button
      className={"absolute right-6 top-6 z-[300]"}
      onClick={onClick}
      initial={{
        opacity: 0,
        pointerEvents: "none",
        x: 15,
      }}
      animate={{
        opacity: 1,
        pointerEvents: "initial",
        x: 0,
        transition: {
          delay: 5,
          duration: 0.5
        }
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24.9859"
        viewBox="0 0 25 24.9859"
        whileHover="hover"
        className="w-12 h-12 p-3"
      >
        <motion.g
          animate={isOpen ? {x: 0} : undefined}
          initial={{
            x: 10
          }}
          variants={isOpen ? undefined : {
            hover: {
              x: 5
            }
          }}
        >
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
              },
              open: {
                rotate: 45,
                y: 9.5,
              }
            }}
          />
        </motion.g>
        <motion.g
          animate={isOpen ? {x: 0} : undefined}
          initial={{
            x: 5
          }}
          variants={isOpen ? undefined : {
            hover: {
              x: 10
            }
          }}
        >
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
        </motion.g>
        <motion.g
          animate={isOpen ? {x: 0} : undefined}
          initial={{
            x: 15
          }}
          variants={isOpen ? undefined : {
            hover: {
              x: 0
            }
          }}
        >
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
              },
              open: {
                rotate: -45,
                y: -9.5,
              }
            }}
          />
        </motion.g>
      </motion.svg>
    </motion.button>
  )
}

export default function Menu({children}: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClickBurger = () => {
    setIsOpen((prevState) => !prevState);
  }

  return (
    <>
      <Button onClick={handleOnClickBurger} isOpen={isOpen}/>
      <motion.div
        className={"w-full h-full"}
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
