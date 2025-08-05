import { User } from "@/types/user";
import StoreCard from "@/ui/cards/storeCard/storeCard";
import ProductScrolling from "../../_ui/product/productScrolling";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  description: string;
  stores: User[];
  isLoading?: boolean;
};

export default function FeedStores({
  title,
  description,
  stores,
  isLoading = false,
}: Props) {
  const router = useRouter();

  const redirectToStore = (storeId: string) => {
    router.push(`/stores/${storeId}`);
  };

  return (
    <section className="w-[95%] mt-8 mb-8 relative mx-auto backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-1 px-2">
        <h2 className="text-xl text-main font-semibold">{title}</h2>
      </div>
      <p className="text-main text-sm mb-4 px-2">{description}</p>
      {isLoading ? (
        <div className="relative w-full">
          <div className="w-full flex overflow-x-auto gap-x-4 pb-4 no-scrollbar">
            {/* Store loading skeleton */}
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="min-w-[164px] w-full max-w-[164px] h-[300px] pb-3 mx-1"
              >
                <div className="w-full h-full rounded-2xl bg-gray-200 animate-pulse">
                  <div className="h-[140px] bg-gray-300 rounded-t-2xl"></div>
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        stores.length > 0 && (
          <ProductScrolling>
            {stores.map((store) => (
              <StoreCard
                key={store.id}
                name={store.businessName as string}
                location={`${store.county.county}, ${store.city.city}`}
                brandLogo={store.profileImage as string}
                coverImage={store.coverImage as string}
                onClick={() => redirectToStore(store.id)}
                email={store.email as string}
                phone={store.phone as string}
              />
            ))}
          </ProductScrolling>
        )
      )}
      {!isLoading && stores.length === 0 && (
        <p className="px-2 text-gray-500">No hay tiendas disponibles en este momento.</p>
      )}
    </section>
  );
}
