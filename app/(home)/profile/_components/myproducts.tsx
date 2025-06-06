"use client";
import clsx from "clsx";
import SectionTitle from "./title";
import useProfile from "../_hooks/useProfile";
import ProductCard from "@/components/cards/productCard";

export default function MyProducts() {
  const { myProducts, data } = useProfile();

  return (
    <div className={clsx("w-full min-h-[400px] flex flex-col items-center justify-start", "mx-auto px-8 mb-8")}>
      <SectionTitle title="Mis Productos" />
      {myProducts.length > 0 ? (
        <div className="w-full flex flex-wrap items-center justify-center gap-4">
          {myProducts.map((product) => (
            <ProductCard
              title={product.name}
              image={product.images[0]}
              price={product.price}
              seller={`${data.name.split(" ")[0]} ${data.surnames.split(" ")[0]}`}
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
