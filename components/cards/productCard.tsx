import { useState } from "react";
import CardImage from "./product/cardImage";
import CardInfo from "./product/cardInfo";
import CardCTA from "./product/cardCta";
import CardDetails from "./product/cardDetails";

type ProductCard = {
  title?: string;
  images?: string[]; // Change to array for carousel
  price?: number;
  seller?: string;
  sellerImage?: string;
  location?: string;
  description?: string;
  isSharedActivated?: boolean;
  isFavoriteActivated?: boolean;
  isDeleteActivated?: boolean;
  isEditActivated?: boolean;
  isImpactActivated?: boolean;
  isButtonActivated?: boolean;
  areNumberOfSalesActivated?: boolean;
  isRatingActivated?: boolean;
  rating?: number;
  sales?: number;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ProductCard({
  title,
  images = [],
  price,
  seller,
  location,
  description,
  sellerImage,
  isFavoriteActivated = true,
  isSharedActivated = true,
  isImpactActivated = true,
  isButtonActivated = true,
  areNumberOfSalesActivated = true,
  isRatingActivated = true,
  rating = 4.5,
  sales = 12,
  onClick,
  onEdit,
  onDelete,
}: ProductCard) {
  const [flipped, setFlipped] = useState(false);
  const sellerPreview = sellerImage || "/brandIcon.webp";
  const carouselImages = images.length > 0 ? images.slice(0, 3) : [];

  return (
    <div className="card-flip-perspective min-w-[270px] w-full max-w-[300px] h-[430px] pb-3">
      <div className={`card-flip-inner ${flipped ? "card-flip-flipped" : ""}`}>
        {/* Front Side */}
        <div className="card-flip-front rounded-2xl bg-white shadow-lg shadow-black/20 overflow-hidden relative flex flex-col justify-between pb-3 h-full">
          <CardImage
            images={carouselImages}
            onFlip={() => setFlipped(true)}
            isFavoriteActivated={isFavoriteActivated}
            isSharedActivated={isSharedActivated}
          />
          <CardInfo
            seller={seller || ""}
            sellerImage={sellerPreview}
            location={location || ""}
            sales={sales}
            areNumberOfSalesActivated={areNumberOfSalesActivated}
            isRatingActivated={isRatingActivated}
            rating={rating}
            title={title || ""}
            description={description || ""}
            price={price || 0}
          />
          <CardCTA isImpactActivated={isImpactActivated} isButtonActivated={isButtonActivated} />
        </div>
        {/* Back Side */}
        <div className="card-flip-back">
          <CardDetails
            userProfileImage={sellerPreview}
            userName={seller || "Vendedor Anónimo"}
            userLocation={location || "Ubicación no disponible"}
            ratings={rating}
            description={description}
            onBack={() => setFlipped(false)}
          />
        </div>
      </div>
    </div>
  );
}
