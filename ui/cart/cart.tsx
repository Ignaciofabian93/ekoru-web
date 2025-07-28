import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import clsx from "clsx";

// Dummy cart items for demonstration
const cartItems = [
  { id: 1, name: "Producto 1", qty: 2 },
  { id: 2, name: "Producto 2", qty: 1 },
  { id: 3, name: "Producto 3", qty: 1 },
];

const Badge = ({ count }: { count: number }) => (
  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-[18px] h-[18px] flex items-center justify-center text-xs">
    {count}
  </div>
);

export default function Cart() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className={clsx("relative w-fit h-fit cursor-pointer")} ref={ref}>
      <div onClick={() => setOpen((v) => !v)}>
        <ShoppingCart size={30} />
        {itemCount > 0 && <Badge count={itemCount} />}
      </div>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 max-h-60 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="text-gray-500 text-sm">El carrito está vacío.</div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-1 text-main">
                  <span className="text-sm">{item.name}</span>
                  <span className="text-xs text-gray-500">x{item.qty}</span>
                </div>
              ))
            )}
          </div>
          <div className="p-2 border-t border-gray-100">
            <button
              onClick={() => router.push("/cart")}
              className="w-full bg-primary text-white rounded-md py-2 text-sm font-semibold hover:bg-primary-dark transition"
            >
              Ver carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
