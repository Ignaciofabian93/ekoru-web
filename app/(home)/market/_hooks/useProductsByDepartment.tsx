import { useEffect, useMemo, useState, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import { PRODUCTS_BY_DEPARTMENT } from "../_graphql/productsByDepartment";
import { Product } from "@/types/product";
import { Filters } from "../types/filters";
import { Badge as EnumBadge } from "@/types/enums"; // Correct import for Badge type

export default function useProductsByDepartment({ id }: { id: number }) {
  const [
    ProductsByDepartment,
    { data: products, loading: productsLoading, error: productsError },
  ] = useLazyQuery(PRODUCTS_BY_DEPARTMENT, {
    fetchPolicy: "cache-and-network",
  });

  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    brands: [],
    minPrice: null,
    maxPrice: null,
    rating: null,
    location: "",
    badges: [],
  });

  useEffect(() => {
    if (id) {
      ProductsByDepartment({ variables: { departmentId: id } });
    }
  }, [id, ProductsByDepartment]);

  useEffect(() => {
    if (productsError) {
      console.error("Error loading products by department:", productsError);
    }
  }, [productsError]);

  const extractUniqueValues = useCallback(
    (keyExtractor: (product: Product) => string | number | null) => {
      return Array.from(
        new Set(products?.productsByDepartment.map(keyExtractor).filter(Boolean) || [])
      );
    },
    [products?.productsByDepartment]
  );

  const brands = useMemo(
    () => extractUniqueValues((p) => p.brand),
    [extractUniqueValues]
  );
  const locations = useMemo(
    () =>
      extractUniqueValues((p) =>
        p.user?.county?.county && p.user?.city?.city
          ? `${p.user.county.county}, ${p.user.city.city}`
          : ""
      ),
    [extractUniqueValues]
  );
  const prices = useMemo(
    () =>
      products?.productsByDepartment
        .map((p: Product) => p.price)
        .filter((price: number) => typeof price === "number" && !isNaN(price)) || [],
    [products?.productsByDepartment]
  );
  const minPrice = useMemo(() => (prices.length ? Math.min(...prices) : null), [prices]);
  const maxPrice = useMemo(() => (prices.length ? Math.max(...prices) : null), [prices]);
  const badges = useMemo(() => {
    const allBadges = products?.productsByDepartment.flatMap(
      (p: Product) => p.badges || []
    );
    return Array.from(new Set(allBadges)) as EnumBadge[];
  }, [products?.productsByDepartment]);

  const onFilterChange = useCallback((filters: Partial<Filters>) => {
    setSelectedFilters((prev) => ({
      ...prev,
      ...filters,
    }));
  }, []);

  const filterProducts = useCallback(
    (product: Product) => {
      const matchesBrand = selectedFilters.brands.length
        ? selectedFilters.brands.includes(product.brand)
        : true;
      const matchesLocation = selectedFilters.location
        ? selectedFilters.location ===
          `${product.user?.county?.county}, ${product.user?.city?.city}`
        : true;
      const matchesMinPrice =
        selectedFilters.minPrice !== null
          ? product.price >= selectedFilters.minPrice
          : true;
      const matchesMaxPrice =
        selectedFilters.maxPrice !== null
          ? product.price <= selectedFilters.maxPrice
          : true;
      const matchesBadges = selectedFilters.badges.length
        ? selectedFilters.badges.some((badge) => product.badges?.includes(badge))
        : true;

      return (
        matchesBrand &&
        matchesLocation &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesBadges
      );
    },
    [selectedFilters]
  );

  const filteredProductList = useMemo(
    () => products?.productsByDepartment.filter(filterProducts) || [],
    [products?.productsByDepartment, filterProducts]
  );

  return {
    products: (products?.productsByDepartment as Product[]) || [],
    productsLoading,
    filteredProductList,
    selectedFilters,
    brands,
    locations,
    prices,
    minPrice,
    maxPrice,
    badges,
    onFilterChange,
  };
}
