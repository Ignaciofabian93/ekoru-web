import Image from "next/image";

export default function MarketHeader() {
  return (
    <section className="flex flex-col items-center justify-start w-full">
      <div className="w-[95%] max-w-[1000px] h-[450px] md:h-[500px] relative overflow-hidden mx-auto rounded-lg mt-4 shadow-xl">
        <Image
          src={"/browse.jpg"}
          alt="Imagen de portada para la búsqueda"
          width={800}
          height={400}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </section>
  );
}
