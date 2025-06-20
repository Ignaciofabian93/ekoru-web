"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Store, CircleDollarSign, Briefcase, BookText, Users, Home, LogOut, UserRoundPen } from "lucide-react";
import { colors } from "@/constants/colors";
import Image from "next/image";
import clsx from "clsx";
import Cart from "../cart/cart";
import UserData from "./userData";
import Button from "../buttons/button";
import useSessionStore from "@/store/session";
import SearchModule from "./searchModule";

const SideArticle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  className = clsx("w-full flex flex-col items-start justify-start", className);
  return <article className={className}>{children}</article>;
};

const SideLink = ({
  children,
  onClick,
  className,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}) => {
  className = clsx(
    "w-full h-[50px] flex items-center justify-start gap-4 cursor-pointer",
    { "text-disabled": disabled },
    className
  );
  return (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  );
};

export default function Navbar() {
  const [isSideNavOpened, setIsSideNavOpened] = useState<boolean>(false);
  const router = useRouter();
  const { data } = useSessionStore();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    router.push("/auth");
  };

  const brandClick = () => {
    router.push("/feed");
  };

  const navigateToProfile = () => {
    router.push("/profile");
  };

  const handleSideNav = () => setIsSideNavOpened(!isSideNavOpened);

  return (
    <header className={clsx("w-full", "fixed top-0 left-0 z-[99]", "navbar-gradient shadow-sm shadow-primary")}>
      <nav
        className={clsx(
          "w-full h-[80px] max-w-[1600px] flex items-center justify-between px-4 md:px-8 gap-4 mx-auto",
          "text-white"
        )}
      >
        {/* LEFT SIDE - MENU & LOGO */}
        <div className="flex items-center justify-between">
          <Menu onClick={handleSideNav} className="cursor-pointer md:hidden" color={colors.primary} size={30} />
          <div
            className="hidden md:flex w-[140px] h-[90%] items-center justify-center cursor-pointer"
            onClick={brandClick}
          >
            <Image src={"/logo.png"} alt="Logo Ekoru" width={4096} height={996} />
          </div>
        </div>
        {/* SEARCH INPUT */}
        <SearchModule />
        {/* RIGHT SIDE - USER & CART */}
        <div className="flex items-center justify-between gap-4">
          <UserData />
          <Cart />
          {/* <LogOut onClick={handleLogout} className="cursor-pointer" /> */}
        </div>
      </nav>

      {/* <SubNavigation /> */}
      {isSideNavOpened && (
        <div
          className="fixed w-full h-[calc(100%_-_80px)] top-[80px] inset-0 z-30 bg-black/30 bg-opacity-30"
          onClick={handleSideNav}
        />
      )}

      {/* SIDE NAVBAR / MOBILE */}
      <aside
        className={clsx(
          "fixed top-[80px] left-0 z-40",
          "w-[260px] h-[calc(100%_-_80px)]",
          "transition-all ease-in-out duration-300",
          "bg-white text-main",
          isSideNavOpened ? "translate-x-0" : "-translate-x-full",
          "overflow-y-auto"
        )}
      >
        <div className={clsx("w-full h-full", "px-4 py-6", "flex flex-col items-start justify-between", "gap-4")}>
          <div className="flex items-center justify-center w-full h-1/12 mb-4">
            <div className="w-[80%] flex items-center justify-center cursor-pointer" onClick={brandClick}>
              <Image src={"/logo.png"} alt="Logo Ekoru" width={4096} height={996} />
            </div>
          </div>
          <SideArticle className="h-2/12">
            <h2 className="text-xl font-semibold mb-2">Bienvenido(a),</h2>
            <p>
              {data?.name} {data?.surnames}
            </p>
          </SideArticle>

          <SideArticle className="h-7/12">
            <SideLink onClick={() => router.push("/feed")}>
              <Home />
              <p className="font-semibold">Inicio</p>
            </SideLink>
            <SideLink onClick={() => router.push("/market")}>
              <CircleDollarSign />
              <p className="font-semibold">Mercado</p>
            </SideLink>
            <SideLink onClick={() => router.push("/stores")} disabled>
              <Store />
              <p className="font-semibold">Tiendas</p>
            </SideLink>
            <SideLink onClick={() => router.push("/services")} disabled>
              <Briefcase />
              <p className="font-semibold">Servicios</p>
            </SideLink>
            <SideLink onClick={() => router.push("/services")} disabled>
              <Users />
              <p className="font-semibold">Comunidad</p>
            </SideLink>
            <SideLink onClick={() => router.push("/services")} disabled>
              <BookText />
              <p className="font-semibold">Cultura</p>
            </SideLink>
            <div className="w-full h-[0.5px] bg-gray-200 my-2" />
            <SideLink onClick={() => router.push("/profile")}>
              <UserRoundPen />
              <p className="font-semibold">Perfil</p>
            </SideLink>
          </SideArticle>

          <SideArticle className="h-1/12 mt-4">
            <Button text="Vender" onClick={() => router.push("/product")} variant="primary" size="full" />
          </SideArticle>
          <SideArticle className="h-1/12">
            <Button text="Cerrar sesión" onClick={handleLogout} variant="danger" size="full" />
          </SideArticle>
        </div>
      </aside>
    </header>
  );
}
