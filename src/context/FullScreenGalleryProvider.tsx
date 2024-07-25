"use client";

import { PropsWithChildren, createContext, useState } from "react";

export const FullScreenGalleryContext = createContext({
  intro: true,
  setIntro: (bool: boolean) => {}
});

const FullScreenGalleryProvider = ({children}: PropsWithChildren) => {
  const [intro, setIntro] = useState(true);

  return (
    <FullScreenGalleryContext.Provider value={{intro, setIntro}}>
      {children}
    </FullScreenGalleryContext.Provider>
  );
}

export default FullScreenGalleryProvider;
