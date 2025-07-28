"use client";
import { useRouter } from "next/navigation";
import PageHeader from "../_ui/pageHeader";
import PageWrapper from "../_ui/pageWrapper";
import wallpaper from "@/assets/images/stores.jpg";
import StoreCard from "@/ui/cards/storeCard/storeCard";
import useStores from "./_hooks/useStores";

export default function StoresPage() {
  const router = useRouter();
  const { stores, storesLoading } = useStores();

  const redirectToStore = (storeId: string) => {
    router.push(`/stores/${storeId}`);
  };

  return (
    <PageWrapper>
      <PageHeader image={wallpaper} alt="Tiendas" message="Revisa las tiendas sustentables en EKORU" />
      <div className="flex flex-wrap justify-center gap-4 p-4 mt-4">
        {storesLoading ? (
          <p>Cargando tiendas...</p>
        ) : (
          stores.map((store) => (
            <StoreCard
              key={store.id}
              name={store.businessName as string}
              description={""}
              brandLogo={store.profileImage as string}
              coverImage={""}
              onClick={() => redirectToStore(store.id)}
            />
          ))
        )}
      </div>
    </PageWrapper>
  );
}
