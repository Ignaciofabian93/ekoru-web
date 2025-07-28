import ProductCard from "@/ui/cards/product/productCard";
import { Product } from "@/types/product";

type Props = {
  products: Product[];
};

export default function ProductsGrid({ products }: Props) {
  return (
    <div className="w-full mx-auto">
      {products && products.length > 0 ? (
        // <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 justify-items-center">
        <div className="flex flex-wrap justify-start gap-2">
          {products.map((product) => (
            <ProductCard
              id={product.id}
              userId={product.user?.id || ""}
              key={product.id}
              title={product.name}
              description={product.description}
              seller={`${product.user?.name} ${product.user?.surnames}`}
              sellerImage={product.user?.profileImage}
              location={`${product.user?.county.county}, ${product.user?.city.city}`}
              price={product.price}
              images={product.images}
              isExchangeable={product.isExchangeable}
              interests={product.interests}
              productCategory={product.productCategory}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-10">No hay productos para mostrar.</p>
      )}
    </div>
  );
}
