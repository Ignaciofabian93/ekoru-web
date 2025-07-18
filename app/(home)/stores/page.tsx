"use client";
import PageHeader from "../_components/pageHeader";
import PageWrapper from "../_components/pageWrapper";
import wallpaper from "@/assets/images/stores.jpg";
import useStoreList from "./_hooks/useStores";
import StoreCard from "@/components/cards/storeCard/storeCard";
import { useRouter } from "next/navigation";

export default function StoresPage() {
  const router = useRouter();
  const { stores, storesLoading } = useStoreList();

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
