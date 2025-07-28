"use client";
import { useParams } from "next/navigation";
import PageWrapper from "../../_ui/pageWrapper";
import ProductDetails from "../_components/productDetails";
import useProduct from "../_hooks/useProduct";

export default function ProductPage() {
  const { id } = useParams();
  const { product, productLoading } = useProduct({ id: Number(id) });

  if (productLoading) return <PageWrapper>Loading...</PageWrapper>;

  return (
    <PageWrapper>
      <ProductDetails product={product} />
    </PageWrapper>
  );
}
