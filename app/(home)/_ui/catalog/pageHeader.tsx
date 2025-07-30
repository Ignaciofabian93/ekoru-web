"use client";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";

type PageHeaderProps = {
  image: StaticImageData;
  alt: string;
  message: string;
};

export default function PageHeader({ image, alt, message }: PageHeaderProps) {
  return (
    <section className="relative w-full h-[450px] mx-auto flex items-center justify-center overflow-hidden">
      <Image src={image} alt={alt} fill priority className="object-cover w-full h-full" />
      <div
        className="absolute z-10 left-0 right-0 bottom-8 flex justify-center items-end pointer-events-none"
        style={{ height: "100%" }}
      >
        <div
          className={clsx(
            "bg-white/70 rounded-xl px-6 py-4 md:px-10 md:py-6 shadow-lg max-w-[80%] md:max-w-[60%] text-center border-2 border-white",
            "text-main font-semibold text-md tracking-[0.01em]",
            "backdrop-blur-xs"
          )}
        >
          {message}
        </div>
      </div>
    </section>
  );
}
