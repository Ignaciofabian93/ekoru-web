import ProductCard from "@/components/cards/productCard";
import useFeedMarket from "../_hooks/useFeedMarket";

export default function StoreMainProducts() {
  const { products } = useFeedMarket({ scope: "STORE", exchange: false });

  return (
    <section className="w-[95%] py-8 mb-8 relative mx-auto">
      <div className="flex items-center gap-2 mb-1 px-2">
        <h2 className="text-xl font-semibold">Productos innovadores que salvan el medio ambiente</h2>
      </div>
      <p className="text-main text-sm mb-4 px-2">Busca tus productos favoritos mientras reduces tu huella.</p>
      {products.length ? (
        <div className="relative w-full">
          <div className="w-full flex overflow-x-auto gap-x-4 pb-4 scrollbar-thin scrollbar-thumb-green-200">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                images={product.images}
                title={product.name}
                sellerImage={product.user?.profileImage}
                seller={product.user?.name || product.user?.businessName}
                description={product.description}
                price={product.price}
                productCategory={product.productCategory}
                location={`${product.user?.county.county}, ${product.user?.city.city}`}
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
