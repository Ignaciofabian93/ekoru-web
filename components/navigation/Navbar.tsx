"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { colors } from "@/constants/colors";
import Image from "next/image";
import clsx from "clsx";
import SearchInput from "../textInput/search";
import Cart from "../cart/cart";
import UserData from "./userData";
import SubNavigation from "./subNavigation";

export default function Navbar() {
  const [isSideNavOpened, setIsSideNavOpened] = useState<boolean>(false);
  const router = useRouter();

  const brandClick = () => {
    router.push("/feed");
  };

  const navigateToProfile = () => {
    router.push("/profile");
  };

  const handleSideNav = () => setIsSideNavOpened(!isSideNavOpened);

  return (
    <header className={clsx("w-full h-[111px] navbar-gradient shadow-sm shadow-primary relative")}>
      <nav
        className={clsx(
          "w-full max-w-[1600px] h-full flex items-center justify-between px-8 gap-4 mx-auto",
          "text-white",
        )}
      >
        <div className="flex items-center justify-between w-[20%] gap-8">
          <Menu onClick={handleSideNav} className="cursor-pointer" color={colors.primary} size={40} />
          <div className="w-[180px] h-[90%] flex items-center justify-center cursor-pointer" onClick={brandClick}>
            <Image src={"/logo.png"} alt="Logo Ekoru" width={4096} height={996} />
          </div>
        </div>
        <SearchInput />
        <div className="flex items-center justify-between gap-12">
          <UserData navigateToProfile={navigateToProfile} />
          <Cart />
        </div>
      </nav>
      <SubNavigation />
      {isSideNavOpened && <div className="fixed inset-0 z-30 bg-black bg-opacity-30" onClick={handleSideNav} />}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-40",
          "w-[260px] h-full",
          "transition-all ease-in-out duration-300",
          "sidebar-gradient text-white",
          isSideNavOpened ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className={clsx("w-full h-full", "px-4 py-8", "flex flex-col items-center justify-start")}>
          <div className="flex items-center justify-between w-full gap-8">
            <Menu onClick={handleSideNav} className="cursor-pointer" color={colors.primary} size={40} />
            <div className="w-[180px] h-[90%] flex items-center justify-center cursor-pointer" onClick={brandClick}>
              <Image src={"/logo.png"} alt="Logo Ekoru" width={4096} height={996} />
            </div>
          </div>
        </div>
      </aside>
    </header>
  );
}
