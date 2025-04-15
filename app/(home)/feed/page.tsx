import Banner from "@/components/banner/Banner";
import PageWrapper from "../_components/PageWrapper";
import Hero from "./_components/Hero";
import Stories from "./_components/Stories";

export default function FeedPage() {
  return (
    <PageWrapper>
      <Stories />
      <Hero />
      <Banner
        title="dale una segunda vida"
        description="¡Tu elección hace la diferencia! Reduce, reutiliza, impacta."
      />
    </PageWrapper>
  );
}
