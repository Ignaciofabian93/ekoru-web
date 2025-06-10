import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { BadgeType, Department, DepartmentCategory, Product, ProductCategory } from "@/types/product";
import { ADD_PRODUCT } from "@/graphql/products/mutation";
import {
  GET_DEPARTMENTS,
  GET_DEPARTMENT_CATEGORY_BY_DEPARTMENT,
  GET_PRODUCT_CATEGORIES_BY_DEPARTMENT_CATEGORY,
} from "@/graphql/products/query";
import useAlert from "@/hooks/useAlert";
import useSessionStore from "@/store/session";

export default function useProduct() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentCategories, setDepartmentCategories] = useState<DepartmentCategory[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const { notify, notifyError } = useAlert();
  const { data } = useSessionStore();

  const [department, setDepartment] = useState<Department>({
    id: 0,
    department: "",
  });
  const [departmentCategory, setDepartmentCategory] = useState<DepartmentCategory>({
    id: 0,
    departmentCategory: "",
  });
  const [productCategory, setProductCategory] = useState<Partial<ProductCategory>>({
    id: 0,
    productCategory: "",
  });
  const [product, setProduct] = useState<Product>({
    id: 0,
    sku: "",
    barcode: "",
    color: "",
    brand: "",
    name: "",
    description: "",
    price: 0,
    images: [],
    hasOffer: false,
    offerPrice: 0,
    stock: 0,
    isExchangeable: false,
    isActive: true,
    ratings: 0,
    ratingCount: 0,
    reviewsNumber: 0,
    productCategoryId: 0,
    userId: "",
    badges: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [Departments] = useLazyQuery(GET_DEPARTMENTS);
  const [DepartmentCategoriesByDepartment] = useLazyQuery(GET_DEPARTMENT_CATEGORY_BY_DEPARTMENT);
  const [ProductCategoriesByDepartmentCategory] = useLazyQuery(GET_PRODUCT_CATEGORIES_BY_DEPARTMENT_CATEGORY);

  const [AddProduct, { loading: ProductLoading }] = useMutation(ADD_PRODUCT, {
    onError: () => {
      notifyError("Ha ocurrido un error al intentar guardar el producto");
    },
    onCompleted: (data) => {
      notify("Producto guardado con éxito");
      setProducts((prev) => [...prev, data.addProduct]);
      setProduct({
        id: 0,
        sku: "",
        barcode: "",
        color: "",
        brand: "",
        name: "",
        description: "",
        price: 0,
        images: [],
        hasOffer: false,
        offerPrice: 0,
        stock: 0,
        productCategoryId: 0,
        userId: "",
        isActive: true,
        isExchangeable: false,
        ratingCount: 0,
        reviewsNumber: 0,
        badges: [],
        createdAt: new Date(),
      });
      setDepartments([]);
      setDepartment({ id: 0, department: "" });
      setDepartmentCategories([]);
      setDepartmentCategory({ id: 0, departmentCategory: "" });
      setProductCategories([]);
      setProductCategory({ id: 0, productCategory: "" });
    },
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      const { data } = await Departments();
      setDepartments(data.departments);
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    if (department.id) {
      const fetchDepartmentCategories = async () => {
        const { data } = await DepartmentCategoriesByDepartment({ variables: { id: department.id } });
        setDepartmentCategories(data.departmentCategoriesByDepartment);
      };

      fetchDepartmentCategories();
    }
  }, [department.id]);

  useEffect(() => {
    if (departmentCategory.id) {
      const fetchProductCategoriesByDepartmentCategory = async () => {
        const { data } = await ProductCategoriesByDepartmentCategory({ variables: { id: departmentCategory.id } });
        setProductCategories(data.productCategoriesByDepartmentCategory);
      };

      fetchProductCategoriesByDepartmentCategory();
    }
  }, [departmentCategory.id]);

  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // HANDLERS

  const selectDepartment = (id: string | number) => {
    const department = departments.find((department) => department.id === id);
    if (department) {
      setDepartment(department);
    }
  };

  const selectDepartmentCategory = (id: string | number) => {
    const departmentCategory = departmentCategories.find((departmentCategory) => departmentCategory.id === id);
    if (departmentCategory) {
      setDepartmentCategory(departmentCategory);
    }
  };

  const selectProductCategory = (id: string | number) => {
    const productCategory = productCategories.find((productCategory) => productCategory.id === id);
    if (productCategory) {
      setProductCategory(productCategory);
    }
  };

  const handleProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "stock") {
      const parsedValue = Number(value);
      setProduct((prev) => ({ ...prev, [name]: parsedValue }));
    } else if (name === "hasOffer" || name === "isExchangeable" || name === "isActive") {
      setProduct((prev) => ({ ...prev, [name]: e.target.checked }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBadges = (selectedBadges: BadgeType[]) => {
    setProduct((prev) => ({ ...prev, badges: selectedBadges }));
  };

  const handleImageUpload = (image: string | null) => {
    if (image) {
      if (product.images.length < 3) {
        setProduct((prev) => ({ ...prev, images: [...prev.images, image] }));
      } else {
        notifyError("Solo puedes subir 3 imágenes");
      }
    }
  };

  const handleImageRemove = (image: string) => {
    setProduct((prev) => ({ ...prev, images: prev.images.filter((img) => img !== image) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, price, stock, images } = product;
    if (!name || !description || !price || !stock || images.length === 0) {
      notifyError("Todos los campos son obligatorios");
    } else {
      await AddProduct({
        variables: {
          name: product.name,
          brand: product.brand,
          sku: product.sku,
          barcode: product.barcode,
          color: product.color,
          badges: product.badges,
          isExchangeable: product.isExchangeable,
          isActive: product.isActive,
          description: product.description,
          price: Number(product.price),
          images: product.images,
          hasOffer: product.hasOffer,
          offerPrice: Number(product.offerPrice),
          stock: product.stock,
          productCategoryId: Number(productCategory.id),
          userId: data.id,
        },
      });
    }
  };

  console.log("product", product);

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
    selectProductCategory,
    handleProduct,
    handleImageUpload,
    handleSubmit,
    ProductLoading,
    handleBadges,
    data,
    handleImageRemove,
  };
}
