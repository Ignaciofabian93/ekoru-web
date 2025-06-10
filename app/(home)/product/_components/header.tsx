import Banner from "@/components/banner/banner";
import clsx from "clsx";
import Image from "next/image";

export default function ProductPageHeader() {
  return (
    <div className={clsx("w-full", "flex flex-col items-center justify-between", "border-b border-gray-200", "gap-8")}>
      <div className="relative w-full h-[400px] bg-accent overflow-hidden">
        {/* Blurred background image */}
        <Image
          src="/products_cover.jpg"
          alt="Portada de pagina de productos"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover blur-lg scale-110"
          aria-hidden="true"
        />
        {/* Foreground clear image */}
        <div className="relative flex items-center justify-center w-full h-full">
          <Image
            src="/products_cover.jpg"
            alt="Portada de pagina de productos"
            width={1100}
            height={400}
            priority
            className="object-contain w-full h-full"
          />
        </div>
      </div>
      <Banner
        title="Sube tu producto"
        description="Dale una nueva vida y comparte tus recuerdos con nosotros y el mundo"
      />
    </div>
  );
}
