import { ShoppingCart } from "lucide-react";
import clsx from "clsx";

const Badge = () => {
  return (
    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-[18px] h-[18px] flex items-center justify-center text-xs">
      3
    </div>
  );
};

export default function Cart() {
  return (
    <div className={clsx("relative w-fit h-fit cursor-pointer")}>
      <ShoppingCart size={24} />
      <div>
        <Badge />
      </div>
    </div>
  );
}
