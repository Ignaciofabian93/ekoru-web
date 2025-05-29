import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Department, DepartmentCategory, Product, ProductCategory } from "@/types/product";
import {
  GET_DEPARTMENT_CATEGORIES,
  GET_DEPARTMENTS,
  GET_DEPARTMENT_CATEGORY,
  GET_DEPARTMENT,
  GET_PRODUCT_CATEGORIES,
  GET_PRODUCT_CATEGORY,
  GET_PRODUCTS,
  GET_PRODUCT,
} from "@/graphql/products/query";

export default function useProduct() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentCategories, setDepartmentCategories] = useState<DepartmentCategory[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [department, setDepartment] = useState<Department>({} as Department);
  const [departmentCategory, setDepartmentCategory] = useState<DepartmentCategory>({} as DepartmentCategory);
  const [productCategory, setProductCategory] = useState<ProductCategory>({} as ProductCategory);
  const [product, setProduct] = useState<Product>({} as Product);

  const [Departments] = useLazyQuery(GET_DEPARTMENTS);
  const [DepartmentCategories] = useLazyQuery(GET_DEPARTMENT_CATEGORIES);
  const [ProductCategories] = useLazyQuery(GET_PRODUCT_CATEGORIES);
  const [Products] = useLazyQuery(GET_PRODUCTS);

  const [DepartmentCategory] = useLazyQuery(GET_DEPARTMENT_CATEGORY);
  const [ProductCategory] = useLazyQuery(GET_PRODUCT_CATEGORY);
  const [Product] = useLazyQuery(GET_PRODUCT);

  useEffect(() => {
    const fetchDepartments = async () => {
      const { data } = await Departments();
      setDepartments(data.departments);
    };

    fetchDepartments();
  }, []);

  // useEffect(() => {
  //   const fetchDepartmentCategories = async () => {
  //     const { data } = await DepartmentCategories();
  //     setDepartmentCategories(data.departmentCategories);
  //   };

  //   fetchDepartmentCategories();
  // }, []);

  // useEffect(() => {
  //   const fetchProductCategories = async () => {
  //     const { data } = await ProductCategories();
  //     setProductCategories(data.productCategories);
  //   };

  //   fetchProductCategories();
  // }, []);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await Products();
  //     setProducts(data.products);
  //   };

  //   fetchProducts();
  // }, []);

  const selectDepartment = (id: string | number) => {
    const department = departments.find((department) => department.id === id);
    if (department) {
      setDepartment(department);
      setDepartmentCategories(department.departmentCategories);
    }
  };

  const selectDepartmentCategory = (id: string | number) => {
    const departmentCategory = departmentCategories.find((departmentCategory) => departmentCategory.id === id);
    if (departmentCategory) {
      setDepartmentCategory(departmentCategory);
      setProductCategories(departmentCategory.productCategories);
    }
  };

  return {
    departments,
    departmentCategories,
    productCategories,
    products,
    department,
    departmentCategory,
    productCategory,
    product,
    selectDepartment,
    selectDepartmentCategory,
  };
}
