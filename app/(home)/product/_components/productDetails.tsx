import Badge from "@/ui/badges/badge";
import Carousel from "@/ui/carousel/carousel";
import { useState } from "react";
import { Product } from "@/types/product";

type ProductDetailsProps = {
  product?: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
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

  return (
    <div className="max-w-full w-full mx-auto p-4 bg-white rounded-2xl shadow-lg flex flex-col gap-8 md:max-w-3xl md:p-6 md:flex-row">
      {/* Galería de imágenes con Carousel */}
      <div className="flex flex-col items-center w-full md:w-1/2">
        <div className="w-full mb-4 flex justify-center relative">
          {totalImages > 0 ? (
            <Carousel>
              <Carousel.Wrapper>
                <img
                  src={product.images[currentIndex]}
                  alt={product.name}
                  className="w-full max-w-xs h-64 object-cover rounded-xl border border-gray-200 shadow-sm mx-auto md:w-64 md:h-64"
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
            <div className="w-full max-w-xs h-64 bg-gray-100 flex items-center justify-center rounded-xl text-gray-400 md:w-64 md:h-64">
              Sin imagen
            </div>
          )}
        </div>
        {product.hasOffer && (
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-2">
            ¡Oferta!
          </span>
        )}
      </div>
      {/* Detalles del producto */}
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 text-center md:text-left">
          {product.name}
        </h1>
        <p className="text-base md:text-lg text-gray-700 mb-4 text-center md:text-left">
          {product.description}
        </p>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-4">
          <span className="text-xl md:text-2xl font-bold text-green-600">
            {product.hasOffer ? (
              <>
                <span className="line-through text-gray-400 mr-2">${product.price?.toLocaleString()}</span>$
                {product.offerPrice?.toLocaleString()}
              </>
            ) : (
              <>${product.price?.toLocaleString()}</>
            )}
          </span>
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
            Stock: {product.stock}
          </span>
        </div>
        <div className="mb-4 text-center md:text-left">
          <span className="font-semibold text-gray-800">Vendedor:</span>{" "}
          {product?.user?.name || product?.user?.businessName}
          <br />
          <span className="font-semibold text-gray-800">Ubicación:</span> {product?.user?.address},
          {product?.user?.county.county},{product?.user?.city.city}
        </div>
        {/* Badges */}
        {product.badges && product.badges.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap justify-center md:justify-start">
            {product.badges.map((badge, idx) => (
              <Badge key={idx} type={badge} />
            ))}
          </div>
        )}
        {/* Impacto ambiental */}
        <div className="mt-4 p-4 bg-gray-50 rounded-xl shadow-inner">
          <h2 className="text-base md:text-lg font-bold text-gray-700 mb-2 text-center md:text-left">
            Impacto ambiental estimado
          </h2>
          <ul className="text-xs md:text-sm text-gray-600 space-y-1">
            <li>
              CO₂ ahorrado:{" "}
              <span className="font-semibold text-green-700">
                {product.productCategory?.firstMaterialType?.estimatedCo2SavingsKG ?? 0} kg
              </span>
            </li>
            <li>
              Agua ahorrada:{" "}
              <span className="font-semibold text-blue-700">
                {product.productCategory?.firstMaterialType?.estimatedWaterSavingsLT ?? 0} lt
              </span>
            </li>
            <li>
              Peso promedio:{" "}
              <span className="font-semibold text-gray-800">
                {product.productCategory?.averageWeight ?? 0} kg
              </span>
            </li>
          </ul>
        </div>
        {/* Intereses */}
        {product.interests?.length > 0 && (
          <div className="mt-4">
            <span className="font-semibold text-gray-800">Intereses:</span>
            <div className="flex gap-2 flex-wrap mt-1 justify-center md:justify-start">
              {product.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
