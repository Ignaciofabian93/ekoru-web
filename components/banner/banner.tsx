import clsx from "clsx";

type Banner = {
  title: string;
  description: string;
  isLoading?: boolean;
  variant?: "bordered" | "filled" | "ghosted";
};

export default function Banner({ title, description, isLoading = false, variant = "bordered" }: Banner) {
  const container = clsx(
    "w-[95%]",
    "flex flex-col items-center justify-center",
    "rounded-[11px]",
    {
      "border-[3px] border-primary bg-white": variant === "bordered",
      "bg-primary border-[3px] border-primary text-white": variant === "filled",
      "bg-white border-[3px] border-gray-400 text-gray-600": variant === "ghosted",
    },
    "mx-auto my-4 py-2 px-2",
    "shadow-sm shadow-slate-950/25"
  );

  const skeletonContainer = clsx(
    "w-[95%]",
    "flex flex-col items-center justify-center",
    "rounded-[11px]",
    "bg-gray-200 border-[3px] border-gray-200",
    "mx-auto my-4 py-2 px-2",
    "animate-pulse"
  );

  const BannerDot = () => (
    <span
      className={clsx(
        "w-[10px]",
        "h-[10px]",
        "rounded-full",
        {
          "bg-primary": variant === "bordered",
          "bg-gray-600": variant === "ghosted",
          "bg-white": variant === "filled",
        },
        "mx-2"
      )}
    />
  );

  return (
    <>
      {isLoading ? (
        <div className={skeletonContainer}>
          <div className="flex items-center justify-center">
            <h4 className="text-[14px] md:text-[18px] lg:text-[22px] uppercase text-center font-semibold text-gray-200 animate-pulse">
              {"Cargando"}
            </h4>
          </div>
          <p className="text-sm md:text-[16px] lg:text-[18px] text-center text-gray-200 animate-pulse">
            {"Cargando descripción"}
          </p>
        </div>
      ) : (
        <article className={container}>
          <div className="flex items-center justify-center">
            <BannerDot />
            <h4 className="text-[14px] md:text-[18px] lg:text-[22px] uppercase text-center font-semibold">{title}</h4>
            <BannerDot />
          </div>
          <p className="text-sm md:text-[16px] lg:text-[18px] text-center">{description}</p>
        </article>
      )}
    </>
  );
}
