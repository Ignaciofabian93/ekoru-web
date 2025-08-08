"use client";
import { useRouter } from "next/navigation";
import PageHeader from "../_ui/catalog/pageHeader";
import PageWrapper from "../_ui/pageWrapper";
import wallpaper from "@/assets/images/stores.jpg";
import StoreCard from "@/ui/cards/storeCard/storeCard";
import useStores from "./_hooks/useStores";
import Banner from "@/ui/banner/banner";

export default function StoresPage() {
  const router = useRouter();
  const { stores, storesLoading } = useStores();

  const redirectToStore = (storeId: string) => {
    router.push(`/stores/${storeId}`);
  };

  return (
    <PageWrapper>
      <PageHeader
        image={wallpaper}
        alt="Tiendas"
        message="Revisa las tiendas sustentables en EKORU"
      />
      <Banner
        title="Tiendas Sustentables"
        description="Descubre tiendas que cuidan el medio ambiente."
        variant="filled"
      />
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {storesLoading ? (
          <p>Cargando tiendas...</p>
        ) : (
          stores.map((store) => (
            <StoreCard
              key={store.id}
              name={store.businessName as string}
              location={`${store.county.county}, ${store.city.city}`}
              brandLogo={store.profileImage as string}
              coverImage={store.coverImage as string}
              onClick={() => redirectToStore(store.id)}
              address={store.address as string}
            />
          ))
        )}
      </div>
    </PageWrapper>
  );
}
