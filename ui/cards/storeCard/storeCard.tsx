import Image from "next/image";
import { Store } from "lucide-react";
import clsx from "clsx";
import Button from "@/ui/buttons/button";

interface StoreCardProps {
  name: string;
  brandLogo: string; // URL or import for the logo
  coverImage?: string; // Optional cover image
  location?: string; // Optional location or city
  email?: string; // Optional email
  phone?: string; // Optional phone number
  onClick: () => void; // Function to handle click events
}

export default function StoreCard({
  name,
  brandLogo,
  coverImage,
  location,
  email,
  phone,
  onClick,
}: StoreCardProps) {
  return (
    <div className={clsx("min-w-[164px] w-full max-w-[164px] h-[300px] pb-3 mx-1")}>
      <button
        className={clsx(
          "w-full h-full",
          "rounded-2xl bg-white shadow-md hover:shadow-lg shadow-gray-800/50",
          "overflow-hidden relative flex flex-col justify-between pb-2",
          "transition-shadow duration-300 ease-in-out",
          "cursor-pointer p-0 border-0"
        )}
      >
        {/* Store Image Section */}
        <div
          className="relative w-full bg-gray-100"
          style={{ aspectRatio: "1 / 1", height: "140px" }}
        >
          {/* Store Badge */}
          <div className="absolute top-2 left-2 z-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
              <Store size={14} className="text-teal-600" />
            </div>
          </div>

          {/* Cover Image or Gradient Background */}
          <div
            className={`h-full w-full flex items-center justify-center ${
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
            {/* Brand Logo Overlay */}
            <div className="absolute bottom-2 right-2 bg-white/90 w-[40px] h-[40px] flex items-center justify-center overflow-hidden backdrop-blur-sm rounded-full p-1 shadow-sm">
              <Image
                src={brandLogo}
                alt={name + " logo"}
                width={24}
                height={24}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Store Info Section */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-gray-900 leading-tight line-clamp-2">
              {name}
            </h3>
            {location && (
              <p className="text-main text-xs font-medium truncate">{location}</p>
            )}

            {/* Contact Information */}
            <div className="space-y-0.5 mt-4">
              {email && <p className="text-gray-500 text-xs truncate">{email}</p>}
              {phone && <p className="text-gray-500 text-xs truncate">{phone}</p>}
            </div>
          </div>
        </div>
        <div className="mt-2 flex justify-center items-center">
          <Button text="Ver tienda" onClick={onClick} size="sm" />
        </div>
      </button>
    </div>
  );
}
