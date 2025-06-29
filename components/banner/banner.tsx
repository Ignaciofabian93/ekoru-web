import clsx from "clsx";

type Banner = {
  title: string;
  description: string;
  isLoading?: boolean;
};

export default function Banner({ title, description, isLoading = false }: Banner) {
  const container = clsx(
    "w-[95%]",
    "flex flex-col items-center justify-center",
    "rounded-[11px]",
    "border-[4px] border-primary bg-white",
    "shadow-sm shadow-slate-950/25",
    "mx-auto my-4 py-2 px-2"
  );

  const skeletonContainer = clsx(
    "w-[95%]",
    "flex flex-col items-center justify-center",
    "rounded-[11px]",
    "bg-gray-200 border-[4px] border-gray-200",
    "mx-auto my-4 py-2 px-2",
    "animate-pulse"
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
            <span className="w-[10px] h-[10px] rounded-full bg-primary mx-2" />
            <h4 className="text-[14px] md:text-[18px] lg:text-[22px] uppercase text-center font-semibold">{title}</h4>
            <span className="w-[10px] h-[10px] rounded-full bg-primary mx-2" />
          </div>
          <p className="text-sm md:text-[16px] lg:text-[18px] text-center">{description}</p>
        </article>
      )}
    </>
  );
}
