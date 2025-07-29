import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "@/graphql/products/query";
import { RotateCw, Forward, Heart } from "lucide-react";
import Image from "next/image";
import useSessionStore from "@/store/session";
import clsx from "clsx";
import useLikeProduct from "@/hooks/useLikeProduct";
import Spinner from "@/ui/spinner/spinner";

type CardImageProps = {
  id: number;
  images: string[];
  onFlip: () => void;
  isFavoriteEnabled: boolean;
  isSharedEnabled: boolean;
  onFavorite?: () => void;
  onShare?: () => void;
};

export default function CardImage({
  id,
  images,
  onFlip,
  isFavoriteEnabled,
  isSharedEnabled,
  onShare,
}: CardImageProps) {
  const [current, setCurrent] = useState(0);
  const { data } = useSessionStore();
  const { likeProduct, likeLoading } = useLikeProduct();
  const [animateHeart, setAnimateHeart] = useState(false);

  // Fetch product data from Apollo cache/server
  const { data: productData } = useQuery(GET_PRODUCT, { variables: { id }, fetchPolicy: "cache-first" });
  const likes: { id: number; userId: string }[] = productData?.product.likes ?? [];

  return (
    <div
      className="relative w-full max-w-[164px] max-h-[140px] bg-gray-100" // Adjusted max height
      style={{ aspectRatio: "1 / 1", height: "140px" }} // Adjusted height
    >
      {/* Flip Button */}
      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
        {" "}
        {/* Adjusted spacing */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFlip();
          }}
          className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 transition"
        >
          <RotateCw className="w-3.5 h-3.5 text-primary" />
        </button>
      </div>

      {/* Image Container */}
      <div className="relative w-full h-full overflow-hidden" style={{ height: "140px" }}>
        {" "}
        {/* Adjusted height */}
        {images.length > 0 ? (
          <>
            <Image
              src={images[current]}
              alt="product"
              width={140}
              height={140}
              className="w-full h-full object-cover"
              priority
            />
            {images.length > 1 && (
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {" "}
                {/* Adjusted spacing */}
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full ${current === idx ? "bg-primary" : "bg-gray-300"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrent(idx);
                    }}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">Sin imagen</div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-2 right-2 flex flex-col gap-1 z-10">
        {" "}
        {/* Adjusted spacing */}
        {isFavoriteEnabled && (
          <button
            className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 transition"
            onClick={(e) => {
              if (!isFavoriteEnabled) return;
              e.stopPropagation();
              setAnimateHeart(true);
              likeProduct({ variables: { id, userId: data?.id } });
            }}
          >
            {likeLoading ? (
              <Spinner />
            ) : (
              <Heart
                onAnimationEnd={() => setAnimateHeart(false)}
                className={clsx("w-3.5 h-3.5 text-primary", {
                  "fill-primary": likes.some((like) => like.userId === data?.id),
                  "animate-heart": animateHeart,
                })}
              />
            )}
          </button>
        )}
        {isSharedEnabled && (
          <button
            className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 transition"
            onClick={(e) => {
              if (!isSharedEnabled) return;
              e.stopPropagation();
              onShare?.();
            }}
          >
            <Forward className="w-3.5 h-3.5 text-primary" />
          </button>
        )}
      </div>
    </div>
  );
}
