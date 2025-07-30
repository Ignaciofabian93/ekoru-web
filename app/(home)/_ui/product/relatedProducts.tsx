import { Product } from "@/types/product";
import ProductScrolling from "./productScrolling";
import ProductCard from "@/ui/cards/product/productCard";
import ProductsSkeleton from "./productsSkeleton";

type Props = {
  productsByProductCategory?: Product[];
  productsByDepartmentCategory?: Product[];
  productsByDepartment?: Product[];
  productsByProductCategoryLoading?: boolean;
  productsByDepartmentCategoryLoading?: boolean;
  productsByDepartmentLoading?: boolean;
  productCategoryName?: string;
  departmentCategoryName?: string;
  departmentName?: string;
};

export default function RelatedProducts({
  productsByProductCategory,
  productsByDepartmentCategory,
  productsByDepartment,
  productsByProductCategoryLoading,
  productsByDepartmentCategoryLoading,
  productsByDepartmentLoading,
  productCategoryName,
  departmentCategoryName,
  departmentName,
}: Props) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full mt-8 mb-8 pb-4 relative mx-auto backdrop-blur-sm border-b-2 border-b-gray-200">
      {children}
    </div>
  );
  return (
    <section className="w-[95%] mt-8 mb-8 relative mx-auto backdrop-blur-sm">
      <h2 className="text-xl font-semibold mb-4">Productos relacionados</h2>
      {productsByProductCategoryLoading ? (
        <Wrapper>
          <div className="relative w-full">
            <div className="w-full flex overflow-x-auto gap-x-4 pb-4 no-scrollbar">
              <ProductsSkeleton />
            </div>
          </div>
        </Wrapper>
      ) : (
        productsByProductCategory &&
        productsByProductCategory.length > 0 && (
          <Wrapper>
            <div>
              <h3 className="text-lg font-semibold mb-4">{productCategoryName}</h3>
              <ProductScrolling>
                {productsByProductCategory.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </ProductScrolling>
            </div>
          </Wrapper>
        )
      )}
      {productsByDepartmentCategoryLoading ? (
        <Wrapper>
          <div className="relative w-full">
            <div className="w-full flex overflow-x-auto gap-x-4 pb-4 no-scrollbar">
              <ProductsSkeleton />
            </div>
          </div>
        </Wrapper>
      ) : (
        productsByDepartmentCategory &&
        productsByDepartmentCategory.length > 0 && (
          <Wrapper>
            <div>
              <h3 className="text-lg font-semibold mb-4">{departmentCategoryName}</h3>
              <ProductScrolling>
                {productsByDepartmentCategory.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </ProductScrolling>
            </div>
          </Wrapper>
        )
      )}
      {productsByDepartmentLoading ? (
        <Wrapper>
          <div className="relative w-full">
            <div className="w-full flex overflow-x-auto gap-x-4 pb-4 no-scrollbar">
              <ProductsSkeleton />
            </div>
          </div>
        </Wrapper>
      ) : (
        productsByDepartment &&
        productsByDepartment.length > 0 && (
          <Wrapper>
            <div>
              <h3 className="text-lg font-semibold mb-4">{departmentName}</h3>
              <ProductScrolling>
                {productsByDepartment.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </ProductScrolling>
            </div>
          </Wrapper>
        )
      )}
    </section>
  );
}
