import { useState } from "react";
import Image from "next/image";
import { RotateCw, Share2, Heart } from "lucide-react";
import useSessionStore from "@/store/session";
import clsx from "clsx";
import useLikeProduct from "@/hooks/useLikeProduct";
import Spinner from "@/components/spinner/spinner";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "@/graphql/products/query";

type CardImageProps = {
  id: number;
  images: string[];
  onFlip: () => void;
  isFavoriteActivated: boolean;
  isSharedActivated: boolean;
  onFavorite?: () => void;
  onShare?: () => void;
};

export default function CardImage({
  id,
  images,
  onFlip,
  isFavoriteActivated,
  isSharedActivated,
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
    <div className="w-full h-[50%] bg-white relative flex items-start">
      {/* fixed height */}
      <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFlip();
          }}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 transition"
        >
          <RotateCw className="w-5 h-5 text-primary" />
        </button>
      </div>
      {images.length > 0 ? (
        <>
          <Image
            src={images[current]}
            alt="product"
            className="w-full h-full object-cover"
            width={480}
            height={240} // match the container height
            priority
          />
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full ${current === idx ? "bg-primary" : "bg-gray-300"}`}
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
      {/* Action Buttons */}
      <div className="absolute bottom-3 right-3 flex flex-col gap-2 z-10">
        {isFavoriteActivated && (
          <button
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 transition"
            onClick={(e) => {
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
                className={clsx("w-5 h-5 text-primary", {
                  "fill-primary": likes.some((like) => like.userId === data?.id),
                  "animate-heart": animateHeart,
                })}
              />
            )}
          </button>
        )}
        {isSharedActivated && (
          <button
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 transition"
            onClick={(e) => {
              e.stopPropagation();
              onShare?.();
            }}
          >
            <Share2 className="w-5 h-5 text-primary" />
          </button>
        )}
      </div>
    </div>
  );
}
