import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Department, DepartmentCategory, Product, ProductCategory } from "@/types/product";
import { ADD_PRODUCT } from "@/graphql/products/mutation";
import { Badge } from "@/types/enums";
import { impactCalculator } from "@/utils/impactCalc";
import {
  GET_DEPARTMENTS,
  GET_DEPARTMENT_CATEGORY_BY_DEPARTMENT,
  GET_PRODUCT_CATEGORIES_BY_DEPARTMENT_CATEGORY,
} from "../_graphql/categories";
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
    __typename: "Department",
    id: 0,
    departmentName: "",
    departmentCategories: [],
  });
  const [departmentCategory, setDepartmentCategory] = useState<DepartmentCategory>({
    __typename: "DepartmentCategory",
    id: 0,
    departmentCategoryName: "",
    productCategories: [],
    departmentId: 0,
    department: {} as Department,
  });
  const [productCategory, setProductCategory] = useState<ProductCategory>({
    __typename: "ProductCategory",
    id: 0,
    productCategoryName: "",
    departmentCategoryId: 0,
    keywords: [],
    size: "M",
    weightUnit: "KG",
    firstMaterialType: null,
    firstMaterialTypeId: null,
    firstMaterialTypeQuantity: null,
    secondMaterialType: null,
    secondMaterialTypeId: null,
    secondMaterialTypeQuantity: null,
    thirdMaterialType: null,
    thirdMaterialTypeId: null,
    thirdMaterialTypeQuantity: null,
    fourthMaterialType: null,
    fourthMaterialTypeId: null,
    fourthMaterialTypeQuantity: null,
    fifthMaterialType: null,
    fifthMaterialTypeId: null,
    fifthMaterialTypeQuantity: null,
    averageWeight: 0,
    products: [],
  });
  const [product, setProduct] = useState<Product>({
    __typename: "Product",
    id: 0,
    sku: "",
    barcode: "",
    color: "",
    brand: "",
    name: "",
    description: "",
    interests: [],
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
    productCategory: {} as ProductCategory,
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
        __typename: "Product",
        id: 0,
        sku: "",
        barcode: "",
        color: "",
        brand: "",
        name: "",
        description: "",
        interests: [],
        price: 0,
        images: [],
        hasOffer: false,
        offerPrice: 0,
        stock: 0,
        productCategoryId: 0,
        userId: "",
        isActive: true,
        isExchangeable: false,
        ratings: 0,
        ratingCount: 0,
        reviewsNumber: 0,
        badges: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        productCategory: {} as ProductCategory,
      });
      setDepartment({ __typename: "Department", id: 0, departmentName: "", departmentCategories: [] });
      setDepartmentCategories([]);
      setDepartmentCategory({
        __typename: "DepartmentCategory",
        id: 0,
        departmentCategoryName: "",
        productCategories: [],
        departmentId: 0,
        department: {} as Department,
      });
      setProductCategories([]);
      setProductCategory({
        __typename: "ProductCategory",
        id: 0,
        productCategoryName: "",
        departmentCategoryId: 0,
        keywords: [],
        size: "M",
        weightUnit: "KG",
        firstMaterialType: null,
        firstMaterialTypeId: null,
        firstMaterialTypeQuantity: null,
        secondMaterialType: null,
        secondMaterialTypeId: null,
        secondMaterialTypeQuantity: null,
        thirdMaterialType: null,
        thirdMaterialTypeId: null,
        thirdMaterialTypeQuantity: null,
        fourthMaterialType: null,
        fourthMaterialTypeId: null,
        fourthMaterialTypeQuantity: null,
        fifthMaterialType: null,
        fifthMaterialTypeId: null,
        fifthMaterialTypeQuantity: null,
        averageWeight: 0,
        products: [],
      });
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
    const { name, checked } = e.target;

    if (name === "isExchangeable") {
      const updatedBadges = checked
        ? [...product.badges, "EXCHANGEABLE"] // Add "EXCHANGEABLE" if checked
        : product.badges.filter((badge) => badge !== "EXCHANGEABLE"); // Remove "EXCHANGEABLE" if unchecked

      setProduct((prev) => ({ ...prev, isExchangeable: checked, badges: updatedBadges as Badge[] }));
    } else if (name === "hasOffer" || name === "isActive") {
      setProduct((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "stock") {
      const parsedValue = Number(e.target.value);
      setProduct((prev) => ({ ...prev, [name]: parsedValue }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

  const handleInterests = (fieldNumber: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const updatedInterests = [...product.interests];
    updatedInterests[fieldNumber] = value;
    setProduct((prev) => ({ ...prev, interests: updatedInterests }));
  };

  const handleBadges = (selectedBadges: Badge[]) => {
    // Ensure "EXCHANGEABLE" badge is preserved if the product is marked as exchangeable
    const filteredBadges = selectedBadges.filter((badge) => badge !== "EXCHANGEABLE");

    // Calculate the maximum number of additional badges allowed
    const maxAdditionalBadges = product.isExchangeable ? 2 : 3;

    if (filteredBadges.length > maxAdditionalBadges) {
      notifyError("El producto no puede tener más de 3 etiquetas");
      return;
    }

    setProduct((prev) => ({
      ...prev,
      badges: product.isExchangeable
        ? ["EXCHANGEABLE", ...filteredBadges] // Include "EXCHANGEABLE" if the product is exchangeable
        : filteredBadges,
    }));
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
          sku: product.sku,
          barcode: product.barcode,
          color: product.color,
          brand: product.brand,
          name: product.name,
          description: product.description,
          interests: product.interests,
          price: Number(product.price),
          images: product.images,
          hasOffer: product.hasOffer,
          offerPrice: Number(product.offerPrice),
          stock: product.stock,
          isExchangeable: product.isExchangeable,
          isActive: product.isActive,
          productCategoryId: Number(productCategory.id),
          userId: data.id,
          badges: product.badges,
        },
      });
    }
  };

  console.log("product: ", product);
  console.log("product category: ", productCategory);

  const productImpactCalculation = impactCalculator({
    firstMaterialType: productCategory.firstMaterialType,
    firstMaterialTypeQuantity: productCategory.firstMaterialTypeQuantity,
    secondMaterialType: productCategory.secondMaterialType,
    secondMaterialTypeQuantity: productCategory.secondMaterialTypeQuantity,
    thirdMaterialType: productCategory.thirdMaterialType,
    thirdMaterialTypeQuantity: productCategory.thirdMaterialTypeQuantity,
    fourthMaterialType: productCategory.fourthMaterialType,
    fourthMaterialTypeQuantity: productCategory.fourthMaterialTypeQuantity,
    fifthMaterialType: productCategory.fifthMaterialType,
    fifthMaterialTypeQuantity: productCategory.fifthMaterialTypeQuantity,
  });

  const totalWasteSavings = productCategory?.averageWeight ?? 0;

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
    handleInterests,
    productImpactCalculation,
    totalWasteSavings,
  };
}
