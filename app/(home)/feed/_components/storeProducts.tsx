import ProductCard from "@/components/cards/productCard";
import useFeedMarket from "../_hooks/useFeedMarket";
import { useRouter } from "next/navigation";

export default function StoreMainProducts() {
  const router = useRouter();
  const { products } = useFeedMarket({ scope: "STORE", exchange: false });

  const redirectToProduct = (productId: number) => {
    router.push(`/market/${productId}`);
  };

  return (
    <section className="w-[94%] px-4 py-8 mb-8 relative mx-auto">
      <div className="flex items-center gap-2 mb-1 px-2">
        <h2 className="text-xl font-semibold">Productos reciclados y de segunda mano</h2>
      </div>
      <p className="text-main text-sm mb-4 px-2">
        Descubre productos únicos y ayuda al planeta. ¡Sube el tuyo o encuentra algo especial!
      </p>
      {products.length ? (
        <div className="relative w-full">
          {/* Left fade */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white/70 to-transparent z-10" />
          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white/70 to-transparent z-10" />
          <div className="w-full flex overflow-x-auto gap-x-6 px-2 pb-4 scrollbar-thin scrollbar-thumb-green-200">
            {products.map((product) => (
              <ProductCard
                onClick={() => redirectToProduct(product.id)}
                key={product.id}
                {...product}
                image={product.images[0]}
                title={product.name}
                sellerImage={product.user?.profileImage}
                location={product.user?.city?.city}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="px-2 text-gray-500">No hay productos disponibles en este momento.</p>
      )}
    </section>
  );
}
