"use client";
import { useParams } from "next/navigation";
import {
  BreadCrumbSkeleton,
  ProductImagesSkeleton,
  ProductInfoSkeleton,
} from "../../_ui/product/skeletons";
import PageWrapper from "../../_ui/pageWrapper";
import ProductDetails from "../_ui/productDetails";
import useProduct from "../_hooks/useProduct";
import ContentWrapper from "../../_ui/contentWrapper";
import RelatedProducts from "../../_ui/product/relatedProducts";

export default function ProductPage() {
  const { id } = useParams();
  const {
    product,
    productLoading,
    productsByDepartment,
    productsByDepartmentCategory,
    productsByProductCategory,
    productsByDepartmentCategoryLoading,
    productsByDepartmentLoading,
    productsByProductCategoryLoading,
  } = useProduct({ id: Number(id) });

  if (productLoading)
    return (
      <PageWrapper>
        <ContentWrapper>
          <div className="mt-4 px-4">
            <BreadCrumbSkeleton isStore={false} />
            <div className="flex flex-col md:flex-row gap-6">
              <ProductImagesSkeleton />
              <ProductInfoSkeleton />
            </div>
          </div>
        </ContentWrapper>
      </PageWrapper>
    );

  return (
    <PageWrapper>
      <ContentWrapper>
        <ProductDetails product={product} />
        <RelatedProducts
          productsByProductCategory={productsByProductCategory}
          productsByDepartmentCategory={productsByDepartmentCategory}
          productsByDepartment={productsByDepartment}
          productsByProductCategoryLoading={productsByProductCategoryLoading}
          productsByDepartmentCategoryLoading={productsByDepartmentCategoryLoading}
          productsByDepartmentLoading={productsByDepartmentLoading}
          productCategoryName={product?.productCategory?.productCategoryName || ""}
          departmentCategoryName={
            product?.productCategory?.departmentCategory?.departmentCategoryName || ""
          }
          departmentName={
            product?.productCategory?.departmentCategory?.department?.departmentName || ""
          }
        />
      </ContentWrapper>
    </PageWrapper>
  );
}
