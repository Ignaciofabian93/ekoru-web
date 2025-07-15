import ProductCard from "@/components/cards/productCard";
import useFeedMarket from "../_hooks/useFeedMarket";

export default function MarketMainProducts() {
  const { products } = useFeedMarket({ scope: "MARKET", exchange: false });

  return (
    <section className="w-[95%] py-8 mb-8 relative mx-auto">
      <div className="flex items-center gap-2 mb-1 px-2">
        <h2 className="text-xl font-semibold">Productos reciclados y de segunda mano</h2>
      </div>
      <p className="text-main text-sm mb-4 px-2">
        Descubre productos únicos y ayuda al planeta. ¡Sube el tuyo o encuentra algo especial!
      </p>
      {products.length ? (
        <div className="relative w-full">
          <div className="w-full flex overflow-x-auto gap-x-4 pb-4 scrollbar-thin scrollbar-thumb-green-200">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                images={product.images}
                title={product.name}
                seller={product.user?.name || product.user?.businessName}
                sellerImage={product.user?.profileImage}
                location={`${product.user?.county.county}, ${product.user?.city.city}`}
                description={product.description}
                price={product.price}
                productCategory={product.productCategory}
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
