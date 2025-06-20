"use client";
import { usePathname, useRouter } from "next/navigation";
import NavDropDown, { DropdownItem } from "./navDropdown";
import clsx from "clsx";
import Button from "../buttons/button";
import useMarketCatalog from "@/app/(home)/market/_hooks/useCatalog";

export default function SubNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { catalog } = useMarketCatalog();

  const marketTree: DropdownItem[] = catalog.map((dept) => ({
    label: dept.departmentName,
    href: `/market/department/${dept.id}`,
    children: dept.departmentCategories.map((cat) => ({
      label: cat.departmentCategoryName,
      href: `/market/department/${dept.id}/department-category/${cat.id}`,
      children: cat.productCategories.map((prodCat) => ({
        label: prodCat.productCategoryName,
        href: `/market/department/${dept.id}/department-category/${cat.id}/product-category/${prodCat.id}`,
      })),
    })),
  }));

  const uploadProduct = () => {
    if (pathname === "/product") return;
    router.push("/product");
  };

  return (
    <div
      className={clsx(
        "hidden md:flex w-full h-[44px] py-2 pr-4 pl-2",
        "bg-white text-sm font-normal",
        "text-[16px]",
        "transition-all ease-in-out duration-300",
        "border-b border-primary"
      )}
    >
      <div className={clsx("max-w-[1600px] mx-auto w-full h-full", "flex items-center justify-start gap-4", "py-4")}>
        <NavDropDown title="Mercado" items={marketTree} />
        <NavDropDown title="Tiendas" items={[]} disabled />
        <NavDropDown title="Servicios" items={[]} disabled />
        <NavDropDown title="Comunidad" items={[]} disabled />
        <NavDropDown title="Cultura" items={[]} disabled />
      </div>
      <div className="flex items-center justify-center">
        <Button text="Vender" onClick={uploadProduct} size="sm" />
      </div>
    </div>
  );
}
