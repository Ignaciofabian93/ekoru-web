"use client";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import useSearch from "@/hooks/useSearch";
import Image from "next/image";

export default function SearchHeader() {
  const { products, productCategories, departmentCategories } = useSearch();

  const crumbs = () => {
    const items = [];

    if (products.length > 0) {
      // Use the first product as an example
      const product = products[0];
      const department = product.productCategory.departmentCategory?.department;
      const departmentCategory = product.productCategory.departmentCategory;
      const productCategory = product.productCategory;

      items.push({
        label: department?.departmentName,
        href: `/search/department/${department?.id}`,
      });
      items.push({
        label: departmentCategory.departmentCategoryName,
        href: `/search/department-category/${departmentCategory.id}`,
      });
      items.push({
        label: productCategory.productCategoryName,
        href: `/search/product-category/${productCategory.id}`,
      });
      items.push({
        label: product.name,
        // Optionally, add a product page link
        href: `/search/product/${product.id}`,
      });
    } else if (productCategories.length > 0) {
      const productCategory = productCategories[0];
      const departmentCategory = productCategory.departmentCategory;
      const department = departmentCategory?.department;

      items.push({
        label: department?.departmentName,
        href: `/search/department/${department?.id}`,
      });
      items.push({
        label: departmentCategory.departmentCategoryName,
        href: `/search/department-category/${departmentCategory.id}`,
      });
      items.push({
        label: productCategory.productCategoryName,
        href: `/search/product-category/${productCategory.id}`,
      });
    } else if (departmentCategories.length > 0) {
      const departmentCategory = departmentCategories[0];
      const department = departmentCategory?.department;

      items.push({
        label: department?.departmentName,
        href: `/search/department/${department?.id}`,
      });
      items.push({
        label: departmentCategory.departmentCategoryName,
        href: `/search/department-category/${departmentCategory.id}`,
      });
    }

    return items;
  };

  return (
    <section className="bg-white shadow-md flex flex-col items-center justify-start w-full">
      <Breadcrumbs items={crumbs()} />
      <div className="w-[98%] h-[450px] relative overflow-hidden mx-auto rounded-lg mt-2 shadow-lg">
        <Image
          src={"/wallpaper.jpg"}
          alt="imagen de portada para resultados"
          width={800}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
