import { Product } from "@/types/product";
import ProductCard from "@/ui/cards/product/productCard";
import ProductsSkeleton from "../../_ui/product/productsSkeleton";
import ProductScrolling from "../../_ui/product/productScrolling";

type Props = {
  title: string;
  description: string;
  products: Product[];
  isLoading?: boolean;
};

export default function FeedProducts({ title, description, products, isLoading = false }: Props) {
  return (
    <section className="w-[95%] mt-8 mb-8 relative mx-auto backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-1 px-2">
        <h2 className="text-xl text-main font-semibold">{title}</h2>
      </div>
      <p className="text-main text-sm mb-4 px-2">{description}</p>
      {isLoading ? (
        <div className="relative w-full">
          <div className="w-full flex overflow-x-auto gap-x-4 pb-4 no-scrollbar">
            <ProductsSkeleton />
          </div>
        </div>
      ) : (
        products.length > 0 && (
          <ProductScrolling>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                userId={product.user?.id || ""}
                images={product.images}
                title={product.name}
                sellerImage={product.user?.profileImage}
                seller={product.user?.name || product.user?.businessName}
                description={product.description}
                price={product.price}
                productCategory={product.productCategory}
                location={`${product.user?.county.county}, ${product.user?.city.city}`}
                isExchangeable={product.isExchangeable}
                interests={product.interests}
              />
            ))}
          </ProductScrolling>
        )
      )}
      {!isLoading && products.length === 0 && (
        <p className="px-2 text-gray-500">No hay productos disponibles en este momento.</p>
      )}
    </section>
  );
}
