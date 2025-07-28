"use client";

import Image from "next/image";

export default function SearchHeader() {
  return (
    <section className="bg-white shadow-md flex flex-col items-center justify-start w-full">
      <div className="w-[98%] h-[450px] relative overflow-hidden mx-auto rounded-lg mt-2 shadow-lg">
        <Image
          src={"/covers/search_cover.jpg"}
          alt="imagen de portada para resultados"
          width={800}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
