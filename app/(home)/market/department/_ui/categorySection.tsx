import ProductCard from "@/components/cards/product/productCard";
import SectionTitle from "@/components/section/sectionTitle";
import { Product } from "@/types/product";
import { CategorySectionSkeleton } from "../../_components/skeletons";

type CategorySection = {
  sectionName?: string;
  title?: string;
  subtitle?: string;
  products?: Product[];
  departmentsLoading: boolean;
};

export default function CategorySection({
  products = [],
  sectionName,
  title,
  subtitle,
  departmentsLoading = false,
}: CategorySection) {
  return (
    <>
      {departmentsLoading ? (
        <CategorySectionSkeleton />
      ) : (
        <section className="w-full min-h-[200px] h-full flex flex-col items-center justify-between pb-8 border-b border-gray-300">
          <SectionTitle sectionName={sectionName} title={title} subtitle={subtitle} />
          <div className="w-full h-full flex flex-col items-center justify-center">
            {products.length ? (
              <div className="flex flex-row gap-4 p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent w-full">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    userId={product.user?.id || ""}
                    seller={product.user?.name || product.user?.businessName}
                    sellerImage={product.user?.profileImage}
                    location={`${product.user?.county.county}, ${product.user?.city.city}`}
                    title={product.name}
                    description={product.description}
                    price={product.price}
                    images={product.images}
                    productCategory={product.productCategory}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-lg font-semibold">No hay productos disponibles</h1>
                <p className="text-base text-main">Por favor, revisa más tarde.</p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
