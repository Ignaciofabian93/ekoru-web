"use client";
import Image, { StaticImageData } from "next/image";

type PageHeaderProps = {
  image: StaticImageData;
  alt: string;
  message: string;
};

export default function PageHeader({ image, alt, message }: PageHeaderProps) {
  return (
    <section className="relative w-[95%] h-[450px] mx-auto flex items-center justify-center overflow-hidden rounded-lg shadow-lg mt-2">
      <Image src={image} alt={alt} fill priority className="object-cover w-full h-full" />
      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
        <h2 className="text-white text-2xl md:text-3xl font-semibold text-center drop-shadow-lg px-6 italic">
          {message}
        </h2>
      </div>
    </section>
  );
}
