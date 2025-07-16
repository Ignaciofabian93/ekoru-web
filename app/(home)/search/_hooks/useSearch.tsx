"use client";
import { useEffect, useMemo, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH } from "@/app/(home)/search/_graphql/query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Product, ProductCategory } from "@/types/product";
import useAlert from "../../../../hooks/useAlert";
import useSearchStore from "@/app/(home)/search/_store/search";
import { Filters } from "../../market/types/filters";

export default function useSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { notifyError } = useAlert();
  const {
    productCategories,
    products,
    searchQuery,
    setSearchQuery,
    setProductCategories,
    setProducts,
    selectedProduct,
    selectedProductCategory,
    setSelectedProductCategory,
    setSelectedProduct,
  } = useSearchStore();

  // Filtering props for selected department page
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    brands: [],
    minPrice: null,
    maxPrice: null,
    rating: null,
    location: "",
    badges: [],
  });

  const [Search, { loading: searchLoading }] = useLazyQuery(SEARCH);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const classifyResults = (data: ProductCategory[] | Product[] | null) => {
    if (!data) {
      setProductCategories([]);
      setProducts([]);
      return;
    }
    // Filter product categories with products and avoid duplicate names
    const seenNames = new Set<string>();
    const productCategoryResults: ProductCategory[] = (data as ProductCategory[])
      .filter(
        (item) => item.__typename === "ProductCategory" && Array.isArray(item.products) && item.products.length > 0
      )
      .filter((item) => {
        if (seenNames.has(item.productCategoryName)) return false;
        seenNames.add(item.productCategoryName);
        return true;
      });
    // Collect all products from categories
    const products: Product[] = productCategoryResults.flatMap((cat) => cat.products);
    setProductCategories(productCategoryResults);
    setProducts(products);
  };

  const handleProductCategorySelect = (category: ProductCategory | null) => setSelectedProductCategory(category);
  const handleProductSelect = (product: Product | null) => setSelectedProduct(product);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim() === "") {
      notifyError("Por favor, ingresa un término de búsqueda.");
      return;
    }
    Search({
      variables: { search: searchQuery },
      onCompleted: (data) => {
        classifyResults(data.search);
        if (data.search && data.search.length > 0) {
          // Navigate to the search results page with the query
          router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
        } else {
          notifyError("No se ha encontrado ningún resultado para la búsqueda.");
        }
      },
      onError: (err) => {
        notifyError("Error al realizar la búsqueda");
        console.error("Search error:", err);
      },
    });
  };

  useEffect(() => {
    // Only run on /search page
    if (pathname.includes("/search")) {
      const query = searchParams.get("query");
      if (query && query !== searchQuery) {
        setSearchQuery(query);
        Search({
          variables: { search: query },
          onCompleted: (data) => {
            classifyResults(data.search);
          },
          onError: (err) => {
            notifyError("Error al realizar la búsqueda");
            console.error("Search error:", err);
          },
        });
      }
    }
  }, [pathname, searchParams]);

  // /////////////////////////////////////////////////////////////////////////////////////////
  function getProductsList() {
    const productsByProductCategory: Product[] = [];
    const products: Product[] = [];

    if (!selectedProductCategory) {
      productCategories.forEach((cat) => {
        cat.products.forEach((product) => {
          productsByProductCategory.push(product);
        });
      });

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
    searchQuery,
    handleSearchChange,
    handleSearchSubmit,
    searchLoading,
    productCategories,
    products,
    selectedProduct,
    selectedProductCategory,
    handleProductCategorySelect,
    handleProductSelect,
    onFilterChange,
    filteredProductList,
    selectedFilters,
    brands,
    locations,
    minPrice,
    maxPrice,
    badges,
  };
}
