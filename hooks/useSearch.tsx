"use client";
import { useLazyQuery } from "@apollo/client";
import { SEARCH } from "@/graphql/search/query";
import { useRouter } from "next/navigation";
import { Department, DepartmentCategory, Product, ProductCategory } from "@/types/product";
import useAlert from "./useAlert";
import useSearchStore from "@/store/search";

export default function useSearch() {
  const router = useRouter();
  const { notifyError } = useAlert();
  const {
    departments,
    departmentCategories,
    productCategories,
    products,
    searchQuery,
    setSearchQuery,
    setDepartments,
    setDepartmentCategories,
    setProductCategories,
    setProducts,
    selectedDepartment,
    selectedDepartmentCategory,
    selectedProduct,
    selectedProductCategory,
    setSelectedDepartment,
    setSelectedDepartmentCategory,
    setSelectedProductCategory,
    setSelectedProduct,
  } = useSearchStore();

  const [Search, { loading: searchLoading }] = useLazyQuery(SEARCH);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const classifyResults = (data: Department[] | DepartmentCategory[] | ProductCategory[] | Product[] | null) => {
    const departmentResults: Department[] = (data as Department[]).filter((item) => item.__typename === "Department");
    const departmentCategoryResults: DepartmentCategory[] = (data as DepartmentCategory[]).filter(
      (item) => item.__typename === "DepartmentCategory"
    );
    const productCategoryResults: ProductCategory[] = (data as ProductCategory[]).filter(
      (item) => item.__typename === "ProductCategory"
    );
    const products: Product[] = (data as Product[]).filter((item) => item.__typename === "Product");

    console.log("DATA:: ", data);

    setDepartments(departmentResults);
    setDepartmentCategories(departmentCategoryResults);
    setProductCategories(productCategoryResults);
    setProducts(products);
  };

  const handleDepartmentSelect = (department: Department | null) => setSelectedDepartment(department);
  const handleDepartmentCategorySelect = (category: DepartmentCategory | null) =>
    setSelectedDepartmentCategory(category);
  const handleProductCategorySelect = (category: ProductCategory | null) => setSelectedProductCategory(category);
  const handleProductSelect = (product: Product | null) => setSelectedProduct(product);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim() === "") {
      notifyError("Por favor, ingresa un término de búsqueda.");
      return;
    }
    Search({
      variables: { query: searchQuery },
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

  return {
    searchQuery,
    handleSearchChange,
    handleSearchSubmit,
    searchLoading,
    departments,
    departmentCategories,
    productCategories,
    products,
    selectedDepartment,
    selectedDepartmentCategory,
    selectedProduct,
    selectedProductCategory,
    handleDepartmentSelect,
    handleDepartmentCategorySelect,
    handleProductCategorySelect,
    handleProductSelect,
  };
}
