"use client";
import PageWrapper from "../_components/pageWrapper";
import Stories from "../_components/stories";
import Hero from "./_components/hero";
import Banner from "../../../components/banner/banner";
import PageSection from "@/components/section/pageSection";
import dynamic from "next/dynamic";
import MarketMainProducts from "./_components/marketProducts";
import StoreMainProducts from "./_components/storeProducts";

const DynamicInfoSection = dynamic(() => import("./_components/infoSection"), {
  ssr: false,
});

export default function FeedPage() {
  return (
    <PageWrapper>
      {/* <Stories /> */}
      <Hero />
      <Banner
        title="¿hasta dónde llega tu impacto?"
        description="Pequeños retos, grandes cambios. ¡Empieza hoy a descubrirlos!"
      />
      <DynamicInfoSection />
      <Banner
        title="dale una segunda vida"
        description="¡Tu elección hace la diferencia! Reduce, reutiliza, impacta."
      />
      <MarketMainProducts />
      <Banner
        title="tiendas con propósito"
        description="Apoya marcar que respeten el planeta, las personas y tus valores."
      />
      <StoreMainProducts />
    </PageWrapper>
  );
}
