"use client";
import { usePathname, useRouter } from "next/navigation";
import NavDropDown, { DropdownItem } from "./navDropdown";
import clsx from "clsx";
import Button from "../buttons/button";
import useMarketCatalog from "@/app/(home)/market/_hooks/useCatalog";
import useStoreList from "@/app/(home)/stores/_hooks/useStores";

export default function SubNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { catalog, catalogLoading } = useMarketCatalog();
  const { stores, storesLoading } = useStoreList();

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

  const storesTree: DropdownItem[] = stores.map((store) => ({
    label: store.businessName as string,
    href: `/stores/${store.id}`,
  }));

  const uploadProduct = () => {
    if (pathname === "/product/new") return;
    router.push("/product/new");
  };

  return (
    <div className="w-full h-[44px] bg-white border-b border-primary">
      <div
        className={clsx(
          "hidden md:flex w-full max-w-[1300px] h-[44px] py-2 pr-4 pl-2 mx-auto",
          "bg-white text-sm font-normal",
          "text-[16px]",
          "transition-all ease-in-out duration-300",
          "border-b border-primary"
        )}
      >
        <div className={clsx("max-w-[1600px] mx-auto w-full h-full", "flex items-center justify-start gap-4", "py-4")}>
          <NavDropDown title="Mercado" items={marketTree} disabled={catalogLoading} />
          <NavDropDown title="Tiendas" items={storesTree} disabled={storesLoading} />
          <NavDropDown title="Servicios" items={[]} disabled />
          <NavDropDown title="Comunidad" items={[]} disabled />
          <NavDropDown title="Cultura" items={[]} disabled />
        </div>
        <div className="flex items-center justify-center w-[20%]">
          <Button text="Vender" onClick={uploadProduct} size="lg" />
        </div>
      </div>
    </div>
  );
}
