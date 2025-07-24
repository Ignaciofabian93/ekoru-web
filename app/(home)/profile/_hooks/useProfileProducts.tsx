import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Department, DepartmentCategory, Product, ProductCategory } from "@/types/product";
import { Badge } from "@/types/enums";
import {
  GET_DEPARTMENT_CATEGORY_BY_DEPARTMENT,
  GET_DEPARTMENTS,
  GET_PRODUCT_CATEGORIES_BY_DEPARTMENT_CATEGORY,
} from "@/graphql/myProducts/query";
import useAlert from "@/hooks/useAlert";
import useSessionStore from "@/store/session";
import { ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from "@/graphql/myProducts/mutations";

const emptyProduct: Product = {
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
};

const emptyProductCategory: ProductCategory = {
  __typename: "ProductCategory",
  id: 0,
  productCategoryName: "",
  departmentCategoryId: 0,
  departmentCategory: {} as DepartmentCategory,
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
};

const emptyDepartmentCategory: DepartmentCategory = {
  __typename: "DepartmentCategory",
  id: 0,
  departmentCategoryName: "",
  productCategories: [],
  departmentId: 0,
  department: {} as Department,
};

const emptyDepartment: Department = {
  __typename: "Department",
  id: 0,
  departmentName: "",
  departmentCategories: [],
};

export default function useProfileProducts() {
  const { notify, notifyError } = useAlert();
  const { data } = useSessionStore();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [department, setDepartment] = useState<Department>(emptyDepartment);
  const [departmentCategory, setDepartmentCategory] = useState<DepartmentCategory>(emptyDepartmentCategory);
  const [productCategory, setProductCategory] = useState<ProductCategory>(emptyProductCategory);
  const [product, setProduct] = useState<Product>(emptyProduct);

  const [Departments, { data: departments, loading: departmentsLoading }] = useLazyQuery(GET_DEPARTMENTS);
  const [
    DepartmentCategoriesByDepartment,
    { data: departmentCategories, loading: departmentCategoriesLoading },
  ] = useLazyQuery(GET_DEPARTMENT_CATEGORY_BY_DEPARTMENT);
  const [
    ProductCategoriesByDepartmentCategory,
    { data: productCategories, loading: productCategoriesLoading },
  ] = useLazyQuery(GET_PRODUCT_CATEGORIES_BY_DEPARTMENT_CATEGORY);

  const [AddProduct, { loading: newProductLoading }] = useMutation(ADD_PRODUCT, {
    onError: () => {
      notifyError("Ha ocurrido un error al intentar guardar el producto");
    },
    onCompleted: () => {
      notify("Producto guardado con éxito");
      setProduct(emptyProduct);
      setDepartment(emptyDepartment);
      setDepartmentCategory(emptyDepartmentCategory);
      setProductCategory(emptyProductCategory);
      closeForm();
      // Optionally: refetch products here if you want the hook to be self-contained
      // if (typeof window !== 'undefined' && window.refetchMyProducts) window.refetchMyProducts();
    },
    // Optionally: update Apollo cache here for instant UI update
    // refetchQueries: [{ query: GET_MY_PRODUCTS, variables: { userId: data.id } }],
  });

  const [UpdateProduct, { loading: updateProductLoading }] = useMutation(UPDATE_PRODUCT, {
    onError: () => {
      notifyError("Ha ocurrido un error al intentar actualizar el producto");
    },
    onCompleted: () => {
      notify("Producto actualizado con éxito");
      setProduct(emptyProduct);
      setDepartment(emptyDepartment);
      setDepartmentCategory(emptyDepartmentCategory);
      setProductCategory(emptyProductCategory);
      closeForm();
      // Optionally: refetch products here if you want the hook to be self-contained
      // if (typeof window !== 'undefined' && window.refetchMyProducts) window.refetchMyProducts();
    },
    // Optionally: update Apollo cache here for instant UI update
    // refetchQueries: [{ query: GET_MY_PRODUCTS, variables: { userId: data.id } }],
  });

  const [DeleteProduct] = useMutation(DELETE_PRODUCT, {
    onError: () => {
      notifyError("Ha ocurrido un error al intentar eliminar el producto");
    },
    onCompleted: () => {
      notify("Producto eliminado con éxito");
      setProduct(emptyProduct);
      setIsDeleting(false);
    },
  });

  useEffect(() => {
    Departments();
  }, []);

  useEffect(() => {
    if (department.id) {
      DepartmentCategoriesByDepartment({ variables: { id: department.id } });
    }
  }, [department.id]);

  useEffect(() => {
    if (departmentCategory.id) {
      ProductCategoriesByDepartmentCategory({
        variables: { id: departmentCategory.id },
      });
    }
  }, [departmentCategory.id]);

  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // HANDLERS

  const selectDepartment = (id: string | number) => {
    if (!departments || !departments.departments) return;
    const department = departments.departments.find((department: Department) => department.id === id);
    if (department) {
      setDepartment(department);
      setDepartmentCategory(emptyDepartmentCategory); // Reset department category
      setProductCategory(emptyProductCategory); // Reset product category
    }
  };

  const selectDepartmentCategory = (id: string | number) => {
    const departmentCategory = departmentCategories.departmentCategoriesByDepartment.find(
      (departmentCategory: DepartmentCategory) => departmentCategory.id === id
    );
    if (departmentCategory) {
      setDepartmentCategory(departmentCategory);
    }
  };

  const selectProductCategory = (id: string | number) => {
    const productCategory = productCategories.productCategoriesByDepartmentCategory.find(
      (productCategory: ProductCategory) => productCategory.id === id
    );
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
      const value = e.target.value.replace(/^0+(?!$)/, "");
      const parsedValue = value === "" ? 0 : Number(value);
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

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, price, stock, images } = product;
    if (!name || !description || !price || !stock || images.length === 0) {
      notifyError("Debe llenar todos los campos obligatorios y subir al menos una imagen");
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

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, price, stock, images } = product;
    if (!name || !description || !price || !stock || images.length === 0) {
      notifyError("Debe llenar todos los campos obligatorios y subir al menos una imagen");
    } else {
      await UpdateProduct({
        variables: {
          id: product.id,
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

  const handleDeleteProduct = async (productId: number) => {
    await DeleteProduct({
      variables: {
        id: productId,
      },
    });
  };

  const enableEditing = (product: Product) => {
    setProduct(product);
    // Set all selects for editing
    if (
      product.productCategory &&
      product.productCategory.departmentCategory &&
      product.productCategory.departmentCategory.department
    ) {
      setDepartment(product.productCategory.departmentCategory.department);
      setDepartmentCategory(product.productCategory.departmentCategory);
    }
    setProductCategory(product.productCategory);
    setIsEditing(true);
    setShowForm(true);
  };

  const openForm = () => setShowForm(true);
  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setProduct(emptyProduct);
    setDepartment(emptyDepartment);
    setDepartmentCategory(emptyDepartmentCategory);
    setProductCategory(emptyProductCategory);
  };

  const openConfirmModal = (product: Product) => {
    setProduct(product);
    setIsDeleting(true);
  };

  const closeConfirmModal = () => setIsDeleting(false);

  return {
    departments: (departments?.departments as Department[]) || [],
    departmentsLoading,
    departmentCategories:
      (departmentCategories?.departmentCategoriesByDepartment as DepartmentCategory[]) || [],
    departmentCategoriesLoading,
    productCategories: (productCategories?.productCategoriesByDepartmentCategory as ProductCategory[]) || [],
    productCategoriesLoading,
    department,
    departmentCategory,
    productCategory,
    product,
    selectDepartment,
    selectDepartmentCategory,
    selectProductCategory,
    handleProduct,
    handleImageUpload,
    handleAddProduct,
    newProductLoading,
    updateProductLoading,
    handleBadges,
    data,
    handleImageRemove,
    handleInterests,
    enableEditing,
    showForm,
    isEditing,
    openForm,
    closeForm,
    handleUpdateProduct,
    handleDeleteProduct,
    isDeleting,
    openConfirmModal,
    closeConfirmModal,
  };
}
