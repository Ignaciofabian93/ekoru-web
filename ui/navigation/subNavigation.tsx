"use client";
import NavDropDown, { DropdownItem } from "./navDropdown";
import clsx from "clsx";
import useMenu from "@/hooks/useMenu";
import Tooltip from "../tooltip/tooltip";

export default function SubNavigation() {
  const { market, stores, marketLoading, storesLoading } = useMenu();

  const marketTree: DropdownItem[] = market.map((dept) => ({
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

  return (
    <div
      className={clsx(
        "hidden md:flex w-full max-w-[1300px] h-[44px] py-2 pr-4 pl-2 mx-auto",
        "bg-white text-sm font-normal",
        "text-[16px]",
        "transition-all ease-in-out duration-300",
        "border-b border-primary"
      )}
    >
      <div
        className={clsx(
          "max-w-[1600px] mx-auto w-full h-full",
          "flex items-center justify-start gap-4",
          "py-4"
        )}
      >
        <NavDropDown title="Mercado" items={marketTree} disabled={marketLoading} />
        <NavDropDown title="Tiendas" items={storesTree} disabled={storesLoading} />
        <Tooltip message="Próximamente" placement="bottom">
          <NavDropDown title="Servicios" items={[]} disabled />
        </Tooltip>
        <Tooltip message="Próximamente" placement="bottom">
          <NavDropDown title="Comunidad" items={[]} disabled />
        </Tooltip>
        <Tooltip message="Próximamente" placement="bottom">
          <NavDropDown title="Cultura" items={[]} disabled />
        </Tooltip>
      </div>
    </div>
  );
}
