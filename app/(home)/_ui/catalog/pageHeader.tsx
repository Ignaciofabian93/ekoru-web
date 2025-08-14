"use client";
import Image, { StaticImageData } from "next/image";

type PageHeaderProps = {
  image: StaticImageData;
  alt: string;
  message: string;
};

export default function PageHeader({ image, alt }: PageHeaderProps) {
  return (
    <section className="relative w-full h-[450px] mx-auto flex items-center justify-center overflow-hidden">
      <Image src={image} alt={alt} fill priority className="object-cover w-full h-full" />
      <div
        className="absolute z-10 left-0 right-0 bottom-8 flex justify-center items-end pointer-events-none"
        style={{ height: "100%" }}
      ></div>
    </section>
  );
}
