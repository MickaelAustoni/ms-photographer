import Title from "@/components/DataDisplay/Title";
import Copyright from "@/components/DataDisplay/Copyright";
import MenuContainer from "@/components/Menu/MenuContainer";
import { PropsWithChildren } from "react";

export default function Gallery({ children } : PropsWithChildren) {
  return (
    <main className={"overflow-hidden w-full h-full"}>
      <MenuContainer>
        <Title />
        {children}
        <Copyright />
      </MenuContainer>
    </main>
  );
}
