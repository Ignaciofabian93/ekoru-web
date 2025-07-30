"use client";
import { useParams } from "next/navigation";
import PageWrapper from "../../_ui/pageWrapper";
import ProductDetails from "../_components/productDetails";
import useProduct from "../_hooks/useProduct";
import ContentWrapper from "../../_ui/contentWrapper";

export default function ProductPage() {
  const { id } = useParams();
  const { product, productLoading } = useProduct({ id: Number(id) });

  if (productLoading)
    return (
      <PageWrapper>
        <ContentWrapper>
          <p>Cargando detalles del producto...</p>
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
