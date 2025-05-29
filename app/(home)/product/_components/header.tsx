import clsx from "clsx";

export default function ProductPageHeader() {
  return (
    <div
      className={clsx("w-full h-[80px]", "px-4 py-2", "flex items-center justify-between", "border-b border-gray-200")}
    >
      <h1 className="text-[22px] font-semibold">Sube tu producto</h1>
    </div>
  );
}
