"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import SearchInput from "../textInput/Search";
import Cart from "../cart/Cart";
import MenuIcon from "@/assets/icons/menu";
import UserData from "./UserData";

export default function Navbar() {
  const router = useRouter();

  const brandClick = () => {
    router.push("/feed");
  };

  const navigateToProfile = () => {
    router.push("/profile");
  };

  return (
    <header className={clsx("w-full h-[111px] navbar-gradient shadow-sm shadow-primary")}>
      <nav className={clsx("w-full h-full flex items-center justify-between px-8 gap-4", "text-white")}>
        <div className="flex items-center justify-between w-[20%]">
          <MenuIcon />
          <div className="w-[180px] h-[90%] flex items-center justify-center cursor-pointer" onClick={brandClick}>
            <Image src={"/logo.png"} alt="Logo Ekoru" width={4096} height={996} />
          </div>
        </div>
        <SearchInput />
        <div className="flex items-center justify-between w-[18%]">
          <UserData navigateToProfile={navigateToProfile} />
          <Cart />
        </div>
      </nav>
    </header>
  );
}
