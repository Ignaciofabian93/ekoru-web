"use client";
import { usePathname, useRouter } from "next/navigation";
import { ProductCategory } from "@/types/product";
import DropDown, { DropdownItem } from "../dropdowns/dropdown";
import clsx from "clsx";
import Button from "../buttons/button";
import useBrowse from "@/hooks/useBrowse";

export default function SubNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { productCategories } = useBrowse();

  function buildCategoryTree(productCategories: ProductCategory[]) {
    const tree: Record<string, any> = {};

    productCategories.forEach((cat) => {
      const dept = cat.departmentCategory.department;
      const deptCat = cat.departmentCategory;

      if (!tree[dept.id]) {
        tree[dept.id] = {
          id: dept.id,
          name: dept.departmentName,
          categories: {},
        };
      }
      if (!tree[dept.id].categories[deptCat.id]) {
        tree[dept.id].categories[deptCat.id] = {
          id: deptCat.id,
          name: deptCat.departmentCategoryName,
          productCategories: [],
        };
      }
      tree[dept.id].categories[deptCat.id].productCategories.push({
        id: cat.id,
        name: cat.productCategoryName,
      });
    });

    return tree;
  }

  function treeToDropdownItems(tree: Record<string, any>): DropdownItem[] {
    console.log("tree", tree);

    return Object.values(tree).map((dept: any) => ({
      label: dept.name,
      href: `/browse/department/${dept.id}`,
      children: Object.values(dept.categories).map((cat: any) => ({
        label: cat.name,
        href: `/browse/department/${dept.id}/department-category/${cat.id}`,
        children: cat.productCategories.map((prod: any) => ({
          label: prod.name,
          href: `/browse/department/${dept.id}/department-category/${cat.id}/product-category/${prod.id}`,
        })),
      })),
    }));
  }

  const categoryTree = buildCategoryTree(productCategories);
  const mercadoItems = treeToDropdownItems(categoryTree);

  const uploadProduct = () => {
    if (pathname === "/product") return;
    router.push("/product");
  };

  console.log("productCategories", productCategories);

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
        <DropDown title="Mercado" items={mercadoItems} />
        <DropDown title="Tiendas" items={[]} disabled />
        <DropDown title="Servicios" items={[]} disabled />
        <DropDown title="Comunidad" items={[]} disabled />
        <DropDown title="Cultura" items={[]} disabled />
      </div>
      <div className="flex items-center justify-center">
        <Button text="Vender" onClick={uploadProduct} size="sm" />
      </div>
    </div>
  );
}
