import PageWrapper from "../_components/pageWrapper";
import Stories from "./_components/stories";
import Hero from "./_components/hero";
import Banner from "@/components/banner/banner";

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
