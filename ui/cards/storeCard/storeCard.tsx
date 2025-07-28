import Image from "next/image";

interface StoreCardProps {
  name: string;
  description: string; // Short tagline or description
  brandLogo: string; // URL or import for the logo
  coverImage?: string; // Optional cover image
  location?: string; // Optional location or city
  productPreviewImages?: string[]; // Optional preview of product images
  onClick: () => void; // Function to handle click events
}

export default function StoreCard({
  name,
  description,
  brandLogo,
  coverImage,
  location,
  productPreviewImages = [],
  onClick,
}: StoreCardProps) {
  return (
    <button
      onClick={onClick}
      className="store-card group w-80 rounded-2xl overflow-hidden shadow-lg p-0 border-0 bg-white cursor-pointer transition-transform hover:-translate-y-1 focus:ring-2 focus:ring-primary-500"
    >
      <div
        className={`h-32 flex items-center justify-center relative ${
          coverImage ? "" : "bg-gradient-to-br from-cyan-100 to-pink-100"
        }`}
        style={
          coverImage
            ? {
                backgroundImage: `url(${coverImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }
            : {}
        }
      >
        <div className="absolute left-5 -bottom-8 bg-white rounded-full shadow-md p-1">
          <Image
            src={brandLogo}
            alt={name + " logo"}
            width={64}
            height={64}
            className="rounded-full object-cover bg-white"
          />
        </div>
      </div>
      <div className="pt-12 pb-5 px-5 bg-white">
        <p className="font-bold text-lg text-gray-900 m-0">{name}</p>
        {location && <p className="text-teal-500 text-xs mt-1 font-medium">{location}</p>}
        <p className="text-gray-600 text-sm mt-2 min-h-[36px]">{description}</p>
        {productPreviewImages.length > 0 && (
          <div className="flex gap-2 mt-4">
            {productPreviewImages.slice(0, 3).map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`Producto ${idx + 1}`}
                width={40}
                height={40}
                className="rounded-lg object-cover border border-gray-100"
              />
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
