"use client";
import { useEffect, useState } from "react";
import Carousel from "@/components/carousel/carousel";
import image1 from "@/assets/images/exchange.jpg";
import image2 from "@/assets/images/market.jpg";
import image3 from "@/assets/images/stores.jpg";
import image4 from "@/assets/images/benefits.jpg";
import image5 from "@/assets/images/challenges.jpg";
import image6 from "@/assets/images/community.jpg";
import clsx from "clsx";

const slides = [
  {
    image: image1,
    message: "Intercambia productos ecológicos y genera un impacto positivo con cada compra.",
  },
  {
    image: image2,
    message: "Descubre un mercado dedicado a la sostenibilidad y las compras conscientes.",
  },
  {
    image: image3,
    message: "Apoya tiendas ecológicas locales y únete a una comunidad que cuida el planeta.",
  },
  {
    image: image4,
    message: "Disfruta de beneficios exclusivos mientras reduces tu huella de carbono.",
  },
  {
    image: image5,
    message: "Acepta nuevos desafíos y ayúdanos a construir juntos un futuro más verde.",
  },
  {
    image: image6,
    message: "Conéctate con personas afines y haz crecer el movimiento ecológico!",
  },
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isSliding, setIsSliding] = useState(false);

  const handlePrev = () => {
    if (!isSliding) {
      setDirection("left");
      setIsSliding(true);

      const prevIndex = (currentImageIndex - 1 + slides.length) % slides.length;
      setNextImageIndex((prevIndex + 1) % slides.length);

      setTimeout(() => {
        setCurrentImageIndex(prevIndex);
        setIsSliding(false);
      }, 500);
    }
  };

  const handleNext = () => {
    if (!isSliding) {
      setDirection("right");
      setIsSliding(true);

      const nextIndex = (currentImageIndex + 1) % slides.length;
      setNextImageIndex(currentImageIndex);

      setTimeout(() => {
        setCurrentImageIndex(nextIndex);
        setIsSliding(false);
      }, 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const selectImage = (index: number) => {
    if (!isSliding && index !== currentImageIndex) {
      setIsSliding(true);
      setNextImageIndex(currentImageIndex);

      setTimeout(() => {
        setCurrentImageIndex(index);
        setIsSliding(false);
      }, 500);
    }
  };

  return (
    <div
      className={clsx(
        "w-[95%] max-w-[1000px] h-[450px] md:h-[500px] mx-auto overflow-hidden rounded-lg shadow-lg",
        "mb-8 mt-4 relative"
      )}
    >
      <Carousel>
        <Carousel.LeftButton onClick={handlePrev} />
        <Carousel.Wrapper>
          <Carousel.NextImage src={slides[nextImageIndex].image} alt="next-img" width={4896} height={3264} />
          <Carousel.CurrentImage
            src={slides[currentImageIndex].image}
            alt="current-img"
            width={4896}
            height={3264}
            isSliding={isSliding}
            direction={direction}
          />
          {/* Message overlay */}
          <div
            className="absolute z-10 left-0 right-0 bottom-8 flex justify-center items-end pointer-events-none"
            style={{ height: "100%" }}
          >
            <div
              className={clsx(
                "bg-white/70 rounded-xl px-6 py-4 md:px-10 md:py-6 shadow-lg max-w-[80%] md:max-w-[60%] text-center border-2 border-white",
                "text-main font-semibold text-md tracking-[0.01em]",
                "backdrop-blur-xs"
              )}
            >
              {slides[currentImageIndex].message}
            </div>
          </div>
          <Carousel.Dots
            totalImages={slides.length}
            currentIndex={currentImageIndex}
            selectImage={selectImage}
          />
        </Carousel.Wrapper>
        <Carousel.RightButton onClick={handleNext} />
      </Carousel>
    </div>
  );
}
