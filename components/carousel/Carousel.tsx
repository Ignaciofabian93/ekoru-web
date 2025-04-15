/* eslint-disable react/display-name */
import Image, { StaticImageData } from "next/image";

export function Carousel({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full h-full flex items-center justify-between relative rounded-lg overflow-hidden">
      {children}
    </section>
  );
}

Carousel.Wrapper = function ({ children }: { children: React.ReactNode }) {
  return <div className="relative w-full h-full overflow-hidden">{children}</div>;
};

Carousel.LeftButton = function ({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="absolute top-1/2 left-4 transform -translate-y-1/2 z-[3] cursor-pointer flex items-center justify-center w-12 h-12 transition-all duration-300 hover:bg-white/35 rounded-full"
      onClick={onClick}
    >
      {/* <CaretLeftIcon /> */}
    </div>
  );
};

Carousel.RightButton = function ({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="absolute top-1/2 right-4 transform -translate-y-1/2 z-[3] cursor-pointer flex items-center justify-center w-12 h-12 transition-all duration-300 hover:bg-white/35 rounded-full"
      onClick={onClick}
    >
      {/* <CaretRightIcon /> */}
    </div>
  );
};

Carousel.NextImage = function ({
  src,
  alt,
  width,
  height,
}: {
  src: StaticImageData;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <Image
      className="absolute top-0 left-0 w-full h-full z-[1] object-cover"
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

Carousel.CurrentImage = function ({
  src,
  alt,
  width,
  height,
  isSliding,
  direction,
}: {
  src: StaticImageData;
  alt: string;
  width: number;
  height: number;
  isSliding: boolean;
  direction: string;
}) {
  const slideClass =
    isSliding && direction === "left"
      ? "translate-x-[-120%] opacity-0"
      : isSliding && direction === "right"
        ? "translate-x-[120%] opacity-0"
        : "";

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full z-[2] transition-transform duration-500 ease-in-out ${slideClass}`}
    >
      <Image
        className="absolute top-0 left-0 w-full h-full object-cover z-[9] transition-all duration-500 ease-in-out"
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  );
};

Carousel.Dots = function ({
  totalImages,
  currentIndex,
  selectImage,
}: {
  totalImages: number;
  currentIndex: number;
  selectImage: (index: number) => void;
}) {
  return (
    <div className="w-full h-5 flex items-center justify-center absolute bottom-2 z-[12]">
      {[...Array(totalImages).keys()].map((d) => (
        <div
          key={d}
          onClick={() => selectImage(d)}
          className={`w-2.5 h-2.5 rounded-full mx-4 cursor-pointer transition-all duration-300 ${
            currentIndex === d ? "bg-white" : "bg-white/50"
          }`}
        />
      ))}
    </div>
  );
};
