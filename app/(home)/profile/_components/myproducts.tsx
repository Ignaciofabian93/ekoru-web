"use client";
import clsx from "clsx";
import SectionTitle from "./title";
import useProfile from "../_hooks/useProfile";
import ProductCard from "@/components/cards/productCard";

export default function MyProducts() {
  const { myProducts, data } = useProfile();

  console.log("MyProducts component data:", myProducts);

  return (
    <div className={clsx("w-full min-h-[400px] flex flex-col items-center justify-start", "mx-auto px-4 mb-8")}>
      <SectionTitle title="Mis Productos" />
      {myProducts.length > 0 ? (
        <div className="w-full flex overflow-x-scroll no-scrollbar items-center justify-start gap-4 mt-4 px-1 py-4">
          {myProducts.map((product) => (
            <ProductCard
              id={product.id}
              key={product.id}
              title={product.name}
              images={product.images}
              price={product.price}
              seller={data.name.split(" ")[0]}
              sellerImage={data.profileImage}
              description={product.description}
              location={`${data.county.county}, ${data.city.city}`}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-[18px] font-semibold">No tienes productos</p>
        </div>
      )}
    </div>
  );
}
