import PageWrapper from "../components/pageWrapper";
import Stories from "../components/stories";
import Hero from "./_components/hero";
import Banner from "../../../components/banner/banner";
import InfoSection from "./_components/infoSection";
import PageSection from "@/components/section/pageSection";

export default function FeedPage() {
  return (
    <PageWrapper>
      <Stories />
      <Hero />
      <Banner
        title="¿hasta dónde llega tu impacto?"
        description="Pequeños retos, grandes cambios. ¡Empieza hoy a descubrirlos!"
      />
      <InfoSection />
      <Banner
        title="dale una segunda vida"
        description="¡Tu elección hace la diferencia! Reduce, reutiliza, impacta."
      />
      <PageSection />
    </PageWrapper>
  );
}
