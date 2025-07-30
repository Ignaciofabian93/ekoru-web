import { useState } from "react";
import { Product } from "@/types/product";
import Badge from "@/ui/badges/badge";
import Carousel from "@/ui/carousel/carousel";
import { impactCalculator } from "@/utils/impactCalc";
import Link from "next/link";
import Image from "next/image";
import Button from "@/ui/buttons/button";

// Add Mercado Libre-inspired styling
export default function ProductDetails({ product }: { product?: Product }) {
  if (!product) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = product.images?.length || 0;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };
  const selectImage = (idx: number) => setCurrentIndex(idx);

  const productImpactCalculation =
    product.productCategory &&
    impactCalculator({
      firstMaterialType: product.productCategory.firstMaterialType,
      firstMaterialTypeQuantity: product.productCategory.firstMaterialTypeQuantity,
      secondMaterialType: product.productCategory.secondMaterialType,
      secondMaterialTypeQuantity: product.productCategory.secondMaterialTypeQuantity,
      thirdMaterialType: product.productCategory.thirdMaterialType,
      thirdMaterialTypeQuantity: product.productCategory.thirdMaterialTypeQuantity,
      fourthMaterialType: product.productCategory.fourthMaterialType,
      fourthMaterialTypeQuantity: product.productCategory.fourthMaterialTypeQuantity,
      fifthMaterialType: product.productCategory.fifthMaterialType,
      fifthMaterialTypeQuantity: product.productCategory.fifthMaterialTypeQuantity,
    });

  const breadCrumb = {
    department: {
      id: product.productCategory?.departmentCategory?.id,
      name: product.productCategory?.departmentCategory?.department?.departmentName,
    },
    departmentCategory: {
      id: product.productCategory?.departmentCategory?.id,
      name: product.productCategory?.departmentCategory?.departmentCategoryName,
    },
    productCategory: {
      id: product.productCategory?.id,
      name: product.productCategory?.productCategoryName,
    },
  };

  const isStore = product.user?.isCompany;
  const isExchangeable = product.isExchangeable ?? false;

  const BreadCrumb = () => {
    if (isStore) {
      return (
        <div className="text-sm text-gray-500 mb-4">
          <Link href={`/store/${product.user?.id}`}>
            Ver mas productos de <span className="font-bold">{product.user?.businessName}</span>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="text-sm text-gray-500 mb-4 flex gap-2">
          <Link href={"/"} className="hover:underline">
            Inicio
          </Link>
          &gt;
          <Link href={`/market/${breadCrumb.department.id}`} className="hover:underline">
            {breadCrumb.department.name}
          </Link>
          &gt;
          <Link href={`/market/${breadCrumb.departmentCategory.id}`} className="hover:underline">
            {breadCrumb.departmentCategory.name}
          </Link>
          &gt;
          <Link href={`/market/${breadCrumb.productCategory.id}`} className="hover:underline">
            {breadCrumb.productCategory.name}
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="mt-4 px-4">
      {/* Breadcrumb Navigation */}
      <BreadCrumb />

      {/* Product Details */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Gallery */}
        <div className="flex-1">
          <div className="relative">
            {totalImages > 0 ? (
              <Carousel>
                <Carousel.Wrapper>
                  <Image
                    src={product.images[currentIndex]}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-lg border border-gray-200 shadow-sm"
                    width={384}
                    height={384}
                  />
                  <Carousel.LeftButton onClick={handlePrev} />
                  <Carousel.RightButton onClick={handleNext} />
                  <Carousel.Dots
                    totalImages={totalImages}
                    currentIndex={currentIndex}
                    selectImage={selectImage}
                  />
                </Carousel.Wrapper>
              </Carousel>
            ) : (
              <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-lg text-gray-400">
                Sin imágenes
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Price and Offer */}
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-primary">
              {product.hasOffer ? (
                <>
                  <span className="line-through text-gray-400 mr-2">${product.price?.toLocaleString()}</span>$
                  {product.offerPrice?.toLocaleString()}
                </>
              ) : (
                <>${product.price?.toLocaleString()}</>
              )}
            </span>
            {product.hasOffer && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">¡Oferta!</span>
            )}
          </div>

          {/* Buy Buttons */}
          <div className="flex gap-4">
            <Button text={isExchangeable ? "Intercambiar" : "Comprar"} size="sm" />
            <Button text="Agregar al carrito" variant="secondary" size="sm" />
          </div>

          {/* Seller Info */}
          <div className="text-sm text-gray-700">
            <p>
              <strong>Vendedor:</strong> {product?.user?.name || product?.user?.businessName}
            </p>
            <p>
              <strong>Ubicación:</strong> {product?.user?.address}, {product?.user?.county.county},{" "}
              {product?.user?.city.city}
            </p>
          </div>

          {/* Badges */}
          {product.badges && product.badges.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-4">
              {product.badges.map((badge, idx) => (
                <Badge key={idx} type={badge} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="mt-8 p-6">
        <h2 className="text-lg font-bold text-main mb-4">Impacto ambiental estimado</h2>
        <ul className="text-sm space-y-2">
          <li className="flex items-center text-main gap-2 font-semibold">
            CO₂ ahorrado:{" "}
            <span className="font-semibold text-primary">
              {productImpactCalculation ? productImpactCalculation.totalCo2Savings : 0} kg
            </span>
          </li>
          <li className="flex items-center text-main gap-2 font-semibold">
            Agua ahorrada:{" "}
            <span className="font-semibold text-primary">
              {productImpactCalculation ? productImpactCalculation.totalWaterSavings : 0} lt
            </span>
          </li>
          <li className="flex items-center text-main gap-2 font-semibold">
            Peso promedio:{" "}
            <span className="font-semibold text-primary">
              {product.productCategory?.averageWeight ?? 0} kg
            </span>
          </li>
        </ul>
      </div>

      {/* Interests */}
      {product.interests?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Intereses</h2>
          <div className="flex gap-2 flex-wrap">
            {product.interests.map((interest, idx) => (
              <span key={idx} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm font-medium">
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
