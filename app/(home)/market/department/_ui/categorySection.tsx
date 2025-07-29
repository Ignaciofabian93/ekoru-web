import { Product } from "@/types/product";
import ProductCard from "@/ui/cards/product/productCard";
import SectionTitle from "@/ui/section/sectionTitle";
import ProductScrolling from "@/app/(home)/_ui/product/productScrolling";
import ProductsSkeleton from "@/app/(home)/_ui/product/productsSkeleton";

type CategorySection = {
  sectionName?: string;
  title?: string;
  subtitle?: string;
  products?: Product[];
  productsLoading: boolean;
};

export default function CategorySection({
  products = [],
  sectionName,
  title,
  subtitle,
  productsLoading = false,
}: CategorySection) {
  return (
    <>
      <section className="w-full min-h-[200px] h-full flex flex-col items-center justify-between pb-8 border-b border-gray-300">
        <SectionTitle sectionName={sectionName} title={title} subtitle={subtitle} />
        {productsLoading ? (
          <ProductsSkeleton />
        ) : (
          products?.length > 0 && (
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
                  badges={product.badges}
                />
              ))}
            </ProductScrolling>
          )
        )}
        {!products.length && !productsLoading && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-lg font-semibold">No hay productos disponibles</h1>
            <p className="text-base text-main">Por favor, revisa más tarde.</p>
          </div>
        )}
      </section>
    </>
  );
}
