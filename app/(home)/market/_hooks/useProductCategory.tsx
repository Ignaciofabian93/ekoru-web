import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLazyQuery } from "@apollo/client";
import { Product, ProductCategory } from "@/types/product";
import { GET_PRODUCT_CATEGORIES, GET_PRODUCT_CATEGORY } from "../_graphql/productCategories";
import { Filters } from "../types/filters";
import useAlert from "@/hooks/useAlert";
import useCategoryStore from "../_store/categories";

export default function useProductCategories() {
  const router = useRouter();
  const pathname = usePathname();
  const { notifyError } = useAlert();
  const { productCategories, selectedProductCategory, setSelectedProductCategory, setProductCategories } =
    useCategoryStore();

  // Filtering props for selected department page
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    brands: [],
    minPrice: null,
    maxPrice: null,
    rating: null,
    location: "",
    badges: [],
  });

  const [ProductCategoriesByDepartmentCategory, { loading: productCategoriesLoading }] =
    useLazyQuery(GET_PRODUCT_CATEGORIES);
  const [ProductCategory, { loading: productCategoryLoading }] = useLazyQuery(GET_PRODUCT_CATEGORY);

  const isProductCategoriesPage = /^\/market\/department\/\d+\/department-category\/\d+\/product-category\/?$/.test(
    pathname
  );
  // Example URL: /market/department/1/department-category/2/product-category/3
  const pathParts = pathname.split("/");

  // Find the indexes for each segment
  const departmentIdx = pathParts.indexOf("department");
  const departmentCategoryIdx = pathParts.indexOf("department-category");
  const productCategoryIdx = pathParts.indexOf("product-category");

  const departmentId =
    departmentIdx !== -1 && pathParts.length > departmentIdx + 1 ? parseInt(pathParts[departmentIdx + 1]) : null;

  const departmentCategoryId =
    departmentCategoryIdx !== -1 && pathParts.length > departmentCategoryIdx + 1
      ? parseInt(pathParts[departmentCategoryIdx + 1])
      : null;

  const productCategoryId =
    productCategoryIdx !== -1 && pathParts.length > productCategoryIdx + 1
      ? parseInt(pathParts[productCategoryIdx + 1])
      : null;

  const selectProductCategory = (productCategory: ProductCategory) => {
    if (selectedProductCategory?.id === productCategory.id) {
      setSelectedProductCategory(null);
    } else setSelectedProductCategory(productCategory);
  };

  // function getProductsByProductCategory(productCategories: ProductCategory[]) {
  //   const productsByProductCategory: Record<string, Product[]> = {};

  //   productCategories.forEach((category) => {
  //     const productCategoryName = category.productCategoryName;
  //     category.products.forEach((product) => {
  //       productsByProductCategory[productCategoryName].push(product);
  //     });
  //   });

  //   return productsByProductCategory;
  // }

  // const productsByProductCategory = getProductsByProductCategory(productCategories);

  const redirectToProductCategory = (departmentCategoryId: number) => {
    router.push(`/market/department/${departmentCategoryId}`);
  };

  const redirectToProductCategorySelected = (departmentCategoryId: number) => {
    router.push(`/market/department/${departmentId}/department-category/${departmentCategoryId}`);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Fetching product categories and category details

  useEffect(() => {
    if (departmentCategoryId && isProductCategoriesPage) {
      fetchProductCategories(departmentCategoryId);
    }
  }, [departmentCategoryId]);

  useEffect(() => {
    if (productCategoryId && isProductCategoriesPage) {
      fetchProductCategory(productCategoryId);
    }
  }, [productCategoryId, isProductCategoriesPage]);

  const fetchProductCategories = async (id: number) => {
    try {
      const { data } = await ProductCategoriesByDepartmentCategory({ variables: { id } });
      if (data.productCategoriesByDepartmentCategory) {
        setProductCategories(data.productCategoriesByDepartmentCategory);
      } else {
        notifyError("No se encontraron categorías de productos");
      }
    } catch (error) {
      notifyError("Error al cargar las categorías de productos");
      console.error("Error fetching product categories:", error);
    }
  };

  const fetchProductCategory = async (id: number) => {
    try {
      const { data } = await ProductCategory({ variables: { id } });
      if (data.productCategory) {
        setSelectedProductCategory(data.productCategory);
      } else {
        notifyError("No se encontró la categoría de producto");
      }
    } catch (error) {
      notifyError("Error al cargar la categoría de producto");
      console.error("Error fetching product category:", error);
    }
  };

  // /////////////////////////////////////////////////////////////////////////////////////////
  // This is for selected department products
  function getProductsList() {
    const productsByProductCategory: Product[] = [];
    const products: Product[] = [];
    console.log("selectedProductCategory:", selectedProductCategory);

    if (!selectedProductCategory) {
      // selectedDepartmentCategory?.productCategories.forEach((cat) => {
      //   cat.products.forEach((product) => {
      //     productsByDepartmentCategory.push(product);
      //   });
      // });

      return productsByProductCategory;
    } else {
      selectedProductCategory.products.forEach((product) => {
        products.push(product);
      });

      return products;
    }
  }

  const productsList = getProductsList();

  // /////////////////////////////////////////////////////////////////////////////////////////
  // Filtering data for selected department page
  const brands = useMemo(() => Array.from(new Set(productsList.map((p) => p.brand).filter(Boolean))), [productsList]);
  const locations = useMemo(
    () =>
      Array.from(
        new Set(
          productsList
            .map((p) =>
              p.user?.county?.county && p.user?.city?.city ? `${p.user.county.county}, ${p.user.city.city}` : ""
            )
            .filter(Boolean)
        )
      ),
    [productsList]
  );
  const prices = useMemo(
    () => productsList.map((p) => p.price).filter((price) => typeof price === "number" && !isNaN(price)),
    [productsList]
  );
  const minPrice = useMemo(() => (prices.length ? Math.min(...prices) : null), [prices]);
  const maxPrice = useMemo(() => (prices.length ? Math.max(...prices) : null), [prices]);
  const badges = useMemo(() => {
    const allBadges = productsList.flatMap((p) => p.badges || []);
    return Array.from(new Set(allBadges));
  }, [productsList]);

  const onFilterChange = (filters: Partial<Filters>) => {
    setSelectedFilters((prev) => ({
      ...prev,
      ...filters,
    }));
  };

  const filteredProductList = useMemo(() => {
    return productsList.filter((product) => {
      const matchesBrand = selectedFilters.brands.length ? selectedFilters.brands.includes(product.brand) : true;
      const matchesLocation = selectedFilters.location
        ? selectedFilters.location === product.user?.county?.county + ", " + product.user?.city?.city
        : true;
      const matchesMinPrice = selectedFilters.minPrice !== null ? product.price >= selectedFilters.minPrice : true;
      const matchesMaxPrice = selectedFilters.maxPrice !== null ? product.price <= selectedFilters.maxPrice : true;
      const matchesBadges = selectedFilters.badges.length
        ? selectedFilters.badges.some((badge) => product.badges?.includes(badge))
        : true;

      return matchesBrand && matchesLocation && matchesMinPrice && matchesMaxPrice && matchesBadges;
    });
  }, [productsList, selectedFilters]);

  return {
    productCategories,
    selectedProductCategory,
    productCategoriesLoading,
    productCategoryLoading,
    selectProductCategory,
    filteredProductList,
    redirectToProductCategory,
    redirectToProductCategorySelected,
    // Filtering props
    selectedFilters,
    brands,
    locations,
    minPrice,
    maxPrice,
    badges,
    onFilterChange,
  };
}
