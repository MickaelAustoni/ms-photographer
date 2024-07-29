import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavMenuProps {
  isOpen: boolean;

  onClose?(): void;
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

const NavLink = ({href, children, onClick}: { href: string, children: ReactNode, onClick?: () => void }) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${isActive ? "font-[900]" : "hover:opacity-[0.7]"}`}>
      {children}
    </Link>
  )
}

export default function NavMenu({isOpen, onClose}: NavMenuProps) {
  return (
    <nav className={"absolute right-9 top-24 text-right text-white z-[300]"} style={{
      display: isOpen ? "block" : "none"
    }}>
      <motion.ul
        initial={"closed"}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
      >
        <motion.li className={"p-2 tracking-widest"} variants={variants}>
          <NavLink href={"/portrait"} onClick={onClose}>Portrait</NavLink>
        </motion.li>
        <motion.li className={"p-2 tracking-widest"} variants={variants}>
          <NavLink href={"/event"} onClick={onClose}>Événement</NavLink>
        </motion.li>
        <motion.li className={"p-2 tracking-widest"} variants={variants}>
          <NavLink href={"/mariage"} onClick={onClose}>Mariage</NavLink>
        </motion.li>
        <motion.li className={"p-2 tracking-widest"} variants={variants}>
          <NavLink href={"/sport"} onClick={onClose}>Sport</NavLink>
        </motion.li>
        <motion.li className={"p-2 tracking-widest"} variants={variants}>
          <a href={"https://www.instagram.com/michael_sanchez_photographie/"} target={"_blank"} rel={"noreferrer"}>
            <Image src={"/images/svg/instagram.svg"} alt={"Instagram"} width="25" height="25"
                   className={"inline-block hover:opacity-[0.7]"}/>
          </a>
        </motion.li>
        <motion.li className={"p-2 tracking-widest"} variants={variants}>
          <a href={"https://www.facebook.com/profile.php?id=100075952735526"} target={"_blank"} rel={"noreferrer"}>
            <Image src={"/images/svg/facebook.svg"} alt={"Facebook"} width="25" height="25"
                   className={"inline-block hover:opacity-[0.7]"}/>
          </a>
        </motion.li>
        <motion.li className={"p-2 tracking-widest"} variants={variants}>
          <a href={"tel:0637115286"} rel={"noreferrer"}>
            <Image src={"/images/svg/phone.svg"} alt={"Téléphone"} width="25" height="25"
                   className={"inline-block hover:opacity-[0.7]"}/>
          </a>
        </motion.li>
      </motion.ul>
    </nav>
  )
}
