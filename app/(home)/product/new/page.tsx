import PageWrapper from "../../_ui/pageWrapper";
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
