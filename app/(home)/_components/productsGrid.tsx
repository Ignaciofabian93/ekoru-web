import ProductCard from "@/components/cards/productCard";
import { Product } from "@/types/product";

type Props = {
  products: Product[];
};

export default function ProductsGrid({ products }: Props) {
  return (
    <div className="w-full sm:w-[60%] lg:w-[75%] xl:w-[80%] mx-auto">
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.name}
              description={product.description}
              seller={`${product.user?.name} ${product.user?.surnames}`}
              sellerImage={product.user?.profileImage}
              location={`${product.user?.county.county}, ${product.user?.city.city}`}
              price={product.price}
              images={product.images}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-10">No hay productos para mostrar.</p>
      )}
    </div>
  );
}
