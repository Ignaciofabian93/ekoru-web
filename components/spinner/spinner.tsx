import clsx from "clsx";

type SpinnerProps = {
  size?: "sm" | "md" | "lg" | "full";
  color?: "primary" | "white";
};

export default function Spinner({ size = "sm", color = "primary" }: SpinnerProps) {
  const sizeMap: Record<string, string> = {
    sm: "w-4 h-4", // 16px
    md: "w-5 h-5", // 20px
    lg: "w-6 h-6", // 24px
    full: "w-6 h-6", // Same as lg for now
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={clsx("border-2 border-t-transparent border-solid rounded-full animate-spin", sizeMap[size], {
          "border-white": color === "white",
          "border-primary": color === "primary",
        })}
      ></div>
    </div>
  );
}
