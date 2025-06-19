import Image from "next/image";

export default function MarketHeader() {
  return (
    <section className="bg-white shadow-md flex flex-col items-center justify-start w-full">
      <div className="w-[95%] h-[430px] relative overflow-hidden mx-auto rounded-lg mt-4 shadow-lg">
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
