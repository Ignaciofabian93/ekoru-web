"use client";
import { useParams } from "next/navigation";
import PageWrapper from "../../_ui/pageWrapper";
import ProductDetails from "../_ui/productDetails";
import useProduct from "../_hooks/useProduct";
import ContentWrapper from "../../_ui/contentWrapper";
import { BreadCrumbSkeleton, ProductImagesSkeleton, ProductInfoSkeleton } from "../../_ui/product/skeletons";

export default function ProductPage() {
  const { id } = useParams();
  const { product, productLoading } = useProduct({ id: Number(id) });

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
      </ContentWrapper>
    </PageWrapper>
  );
}
