import Link from "next/link";
import ProductScrolling from "../product/productScrolling";
import clsx from "clsx";

type CircularOptionsProps = {
  data: { id: number; name: string; href: string }[];
};

export default function RenderCircularOptions({ data }: CircularOptionsProps) {
  return (
    <section className="w-full mt-8 mb-8 relative mx-auto backdrop-blur-sm">
      <ProductScrolling>
        {data.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={clsx(
              "min-w-[150px] min-h-[150px] w-full h-full max-w-[150px] max-h-[150px]",
              "bg-gradient-to-br from-lime-200 via-primary to-secondary",
              "relative rounded-full shadow-md shadow-gray-800/60",
              "flex flex-col items-center justify-center",
              "p-4",
              "transition-all duration-300 ease-in-out",
              "cursor-pointer",
              "hover:shadow-lg"
            )}
          >
            <span className="text-center text-main-inverted font-semibold text-lg">{item.name}</span>
          </Link>
        ))}
      </ProductScrolling>
    </section>
  );
}
