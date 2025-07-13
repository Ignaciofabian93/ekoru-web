import { useState } from "react";
import CardImage from "./product/cardImage";
import CardInfo from "./product/cardInfo";
import CardCTA from "./product/cardCta";
import CardDetails from "./product/cardDetails";
import clsx from "clsx";
import { Badge } from "@/types/enums";
import BadgeLabel from "../badges/badge";
import { ProductCategory } from "@/types/product";
import { impactCalculator } from "@/utils/impactCalc";

type ProductCard = {
  id: number;
  title?: string;
  images?: string[];
  price?: number;
  seller?: string;
  sellerImage?: string;
  location?: string;
  description?: string;
  badges?: Badge[];
  isSharedActivated?: boolean;
  isFavoriteActivated?: boolean;
  totalCo2Savings?: number;
  totalWaterSavings?: number;
  totalWasteSavings?: number;
  isButtonActivated?: boolean;
  isExchangeable?: boolean;
  interests?: string[];
  productCategory?: ProductCategory;
  onClick?: () => void;
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
  sellerImage,
  isFavoriteActivated = true,
  isSharedActivated = true,
  isButtonActivated = true,
  isExchangeable = false,
  interests = [],
  productCategory,
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
    <div className={clsx("min-w-[180px] w-full max-w-[180px] h-auto pb-3")}>
      <div className="card-flip-perspective h-[350px]">
        <div className={`card-flip-inner ${flipped ? "card-flip-flipped" : ""} h-full`}>
          {/* Front Side */}
          <div className="card-flip-front h-full rounded-2xl bg-white shadow-lg shadow-black/20 overflow-hidden relative flex flex-col justify-between pb-3 z-20">
            <CardImage
              id={id}
              images={carouselImages}
              onFlip={() => setFlipped(true)}
              isFavoriteActivated={isFavoriteActivated}
              isSharedActivated={isSharedActivated}
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
            />
            {!isExchangeable && <CardCTA isButtonActivated={isButtonActivated} />}
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
            />
          </div>
        </div>
      </div>
      {/* Badges Section */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 items-center justify-center">
          {badges.map((b) => (
            <BadgeLabel key={b} type={b} />
          ))}
        </div>
      )}
    </div>
  );
}
