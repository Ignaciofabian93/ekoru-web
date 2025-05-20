import clsx from "clsx";
import ProductCard from "../cards/productCard";

export default function PageSection() {
  return (
    <section className={clsx("w-full flex flex-col", "relative", "px-3 py-2", "my-8")}>
      <div className="absolute top-0 left-0 w-[30px] h-[75px] bg-primary" />
      <h2 className="text-[24px] absolute top-4 left-[40px]">Seleccionado para ti</h2>
      <div className="w-full flex items-center mt-[80px] mb-[32px]">
        <div className="w-fit flex flex-col items-center justify-center mx-auto">
          <p className="text-[22px] md:text-[28px]">EKORU te conoce bien.</p>
          <p className="text-[16px] md:text-[22px]">Elecciones con estilo, propósito y 100% tu.</p>
        </div>
      </div>
      <div className="w-full flex items-center overflow-x-scroll gap-4 pb-4 my-4 mx-auto">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
}
