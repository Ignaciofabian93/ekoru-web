import PageWrapper from "../components/pageWrapper";
import ProductForm from "./_components/form";
import ProductPageHeader from "./_components/header";

export default function ProductPage() {
  return (
    <PageWrapper>
      <ProductPageHeader />
      <ProductForm />
    </PageWrapper>
  );
}
