import { useState } from "react";
import { Badge } from "@/types/enums";
import { ProductCategory } from "@/types/product";
import { impactCalculator } from "@/utils/impactCalc";
import BadgeLabel from "../../badges/badge";
import CardImage from "./cardImage";
import CardInfo from "./cardInfo";
import CardCTA from "./cardCta";
import CardDetails from "./cardDetails";
import clsx from "clsx";

type ProductCard = {
  id: number;
  title?: string;
  images?: string[];
  price?: number;
  seller?: string;
  sellerImage?: string;
  location?: string;
  description?: string;
  productCategory?: ProductCategory;
  badges?: Badge[];
  interests?: string[];
  isExchangeable?: boolean;
  totalWasteSavings?: number;
  hasOffer?: boolean;
  offerPrice?: number;
  // Activate or deactivate features
  isSharedEnabled?: boolean;
  isFavoriteEnabled?: boolean;
  isSelectionButtonEnabled?: boolean;
  isCTAClickEnabled?: boolean;
  // Callbacks
  onExchangeClick?: () => void;
};

export default function ProductCard({
  id,
  title,
  images = [],
  price,
  seller,
  location,
  badges = [],
  description,
  interests = [],
  sellerImage,
  productCategory,
  isExchangeable = false,
  isFavoriteEnabled = true,
  isSharedEnabled = true,
  isSelectionButtonEnabled = false,
  isCTAClickEnabled = true,
  hasOffer = false,
  offerPrice = 0,
}: ProductCard) {
  const [flipped, setFlipped] = useState(false);
  const sellerPreview = sellerImage || "/brandIcon.webp";
  const carouselImages = images.length > 0 ? images.slice(0, 3) : [];

  const productImpactCalculation =
    productCategory &&
    impactCalculator({
      firstMaterialType: productCategory.firstMaterialType,
      firstMaterialTypeQuantity: productCategory.firstMaterialTypeQuantity,
      secondMaterialType: productCategory.secondMaterialType,
      secondMaterialTypeQuantity: productCategory.secondMaterialTypeQuantity,
      thirdMaterialType: productCategory.thirdMaterialType,
      thirdMaterialTypeQuantity: productCategory.thirdMaterialTypeQuantity,
      fourthMaterialType: productCategory.fourthMaterialType,
      fourthMaterialTypeQuantity: productCategory.fourthMaterialTypeQuantity,
      fifthMaterialType: productCategory.fifthMaterialType,
      fifthMaterialTypeQuantity: productCategory.fifthMaterialTypeQuantity,
    });

  const totalWasteSavings = productCategory?.averageWeight ?? 0;

  return (
    <div className={clsx("min-w-[164px] w-full max-w-[164px] h-auto pb-3 mx-1")}>
      <div className="card-flip-perspective h-[350px]">
        <div className={`card-flip-inner ${flipped ? "card-flip-flipped" : ""} h-full`}>
          {/* Front Side */}
          <div
            className={clsx(
              "card-flip-front h-full",
              "rounded-2xl bg-white shadow-md hover:shadow-lg shadow-gray-800/50",
              "overflow-hidden relative flex flex-col justify-between pb-3 z-20",
              "transition-shadow duration-300 ease-in-out"
            )}
          >
            <CardImage
              id={id}
              images={carouselImages}
              onFlip={() => setFlipped(true)}
              isFavoriteEnabled={isFavoriteEnabled}
              isSharedEnabled={isSharedEnabled}
            />
            <CardInfo
              seller={seller || ""}
              sellerImage={sellerPreview}
              location={location || ""}
              title={title || ""}
              description={description || ""}
              price={price || 0}
              isExchangeable={isExchangeable}
              interests={interests}
              isSelectionButtonEnabled={isSelectionButtonEnabled}
              isCTAClickEnabled={isCTAClickEnabled}
              hasOffer={hasOffer}
              offerPrice={offerPrice}
            />
            {!isExchangeable && <CardCTA isCTAClickEnabled={isCTAClickEnabled} productId={id} />}
            {isSelectionButtonEnabled && (
              <CardCTA isCTAClickEnabled={isCTAClickEnabled} productId={id} isSelectionButtonEnabled />
            )}
          </div>
          {/* Back Side */}
          <div className="card-flip-back z-10">
            <CardDetails
              userProfileImage={sellerPreview}
              userName={seller || "Vendedor Anónimo"}
              userLocation={location || "Ubicación no disponible"}
              description={description}
              onBack={() => setFlipped(false)}
              totalCo2Savings={productImpactCalculation?.totalCo2Savings}
              totalWaterSavings={productImpactCalculation?.totalWaterSavings}
              totalWasteSavings={totalWasteSavings}
              isSelectionButtonEnabled={isSelectionButtonEnabled}
              isExchangeable={isExchangeable}
              isCTAClickEnabled={isCTAClickEnabled}
            />
          </div>
        </div>
      </div>
      {/* Badges Section */}
      {badges.length > 0 && (
        <div className="flex flex-col gap-2 mt-2 items-center justify-center">
          {badges.map((b) => (
            <BadgeLabel key={b} type={b} />
          ))}
        </div>
      )}
    </div>
  );
}
