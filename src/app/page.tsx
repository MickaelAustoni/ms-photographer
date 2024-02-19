'use client';

import Image from "next/image";
import { SyntheticEvent, useState } from "react";


export default function Home() {
  const [backgroundImage, setBackgroundImage] = useState('');

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const {src} = e.currentTarget;
    setBackgroundImage(`url(${src})`);
  }

  return (
    <main>
      <ul className="flex flex-row p-10 gap-3 z-10 relative">
        <li>
          <Image
            src="/image-1.jpg"
            alt="placeholder"
            priority={true}
            height={1920}
            width={1080}
            className={"select-none cursor-pointer w-100 h-auto"}
            onClick={handleImageLoad}
          />
        </li>
        <li>
          <Image
            src="/image-2.jpg"
            alt="placeholder"
            priority={false}
            height={1920}
            width={1080}
            className={"select-none cursor-pointer w-100 h-auto"}
            onClick={handleImageLoad}
          />
        </li>
      </ul>
      <div style={{ backgroundImage  }} className={"absolute inset-0 z-0 bg-cover"}></div>
    </main>
  );
}
