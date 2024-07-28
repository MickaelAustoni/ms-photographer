import React, { CSSProperties } from 'react';
import { motion } from 'framer-motion';

const ANIMATION_DURATION = 1.3;

interface ArrowProps {
  size?: number;
  style?: CSSProperties;
  className?: string;
}

const Arrow = ({  size = 20 }: ArrowProps) => {
  const strokeWidth = size * 0.1;

  return (
    <motion.div
      className={"-mt-2"}
      variants={{
        initial: { y: 0, opacity: 0 },
        animate: {
          y: [0, 10, 0],
          opacity: [1, 0.6, 1],
          transition: {
            y: {
              repeat: Infinity,
              duration: ANIMATION_DURATION,
              ease: "easeInOut"
            },
            opacity: {
              repeat: Infinity,
              duration: ANIMATION_DURATION,
              ease: "linear"
            }
          },
        },
      }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <line x1="6" y1="8" x2="12" y2="14" stroke="#FFF" strokeWidth={strokeWidth} />
        <line x1="18" y1="8" x2="12" y2="14" stroke="#FFF" strokeWidth={strokeWidth} />
      </motion.svg>
    </motion.div>
  );
};

const ScrollIndicator = ({ className, style, size = 20 }: ArrowProps) => {
  return (
    <motion.div
      style={style}
      className={`absolute z-50 flex flex-col items-center w-10 ${className}`}
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.1,
            ease: 'easeInOut',
          },
        },
      }}
    >
      <Arrow size={size} />
      <Arrow size={size} />
      <Arrow size={size} />
    </motion.div>
  );
};

export default ScrollIndicator;
