import PageWrapper from "../../_components/pageWrapper";
import ProductForm from "../_components/form";
import ProductPageHeader from "../_components/header";

export default function NewProduct() {
  return (
    <PageWrapper>
      <ProductPageHeader />
      <ProductForm />
    </PageWrapper>
  );
}
