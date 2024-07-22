import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface NavMenuProps {
  isOpen: boolean;
  onClose?() : void;
}

const variants = {
  closed: {
    opacity: 0,
    pointerEvents: "none",
    x: 10,
    transition: {
      duration: 0.2,
      staggerChildren: 0.05
    }
  },
  open: {
    opacity: 1,
    pointerEvents: "initial",
    x: 0,
    transition: {
      staggerChildren: 0.1,
    }
  }
} as const;

export default function NavMenu({isOpen, onClose}: NavMenuProps) {
  return (
    <nav className={"absolute right-9 top-24 text-right z-[300]"}>
      <motion.ul
        initial={"closed"}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
      >
        <motion.li className={"p-2 tracking-widest"} variants={variants}>
          <Link href="/portrait" onClick={onClose}>Portrait</Link>
        </motion.li>
        <motion.li className={"p-2 tracking-widest"} variants={variants}>
          <Link href="/reportage" onClick={onClose}>Reportage</Link>
        </motion.li>
        <motion.li className={"p-2 tracking-widest"} variants={variants}>
          <Link href="/mariage" onClick={onClose}>Mariage</Link>
        </motion.li>
        <motion.li className={"p-2 tracking-widest"} variants={variants}>
          <a href={"https://www.instagram.com/michael_sanchez_photographie/"} target={"_blank"} rel={"noreferrer"}>
            <Image src={"/images/svg/instagram.svg"} alt={"Instagram"} width="25" height="25"
                   className={"inline-block"}/>
          </a>
        </motion.li>
        <motion.li className={"p-2 tracking-widest"} variants={variants}>
          <a href={"https://www.facebook.com/profile.php?id=100075952735526"} target={"_blank"} rel={"noreferrer"}>
            <Image src={"/images/svg/facebook.svg"} alt={"Facebook"} width="25" height="25" className={"inline-block"}/>
          </a>
        </motion.li>
      </motion.ul>
    </nav>
  )
}
