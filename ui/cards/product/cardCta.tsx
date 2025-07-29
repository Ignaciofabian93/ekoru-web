import { useRouter } from "next/navigation";
import Button from "@/ui/buttons/button";

type CardCTAProps = {
  productId?: number;
  isSelectionButtonEnabled?: boolean;
  isCTAClickEnabled?: boolean;
};

export default function CardCTA({
  isSelectionButtonEnabled,
  productId,
  isCTAClickEnabled = true,
}: CardCTAProps) {
  const router = useRouter();

  const redirectToProductDetails = () => {
    router.push(`/product/${productId}`);
  };

  const isProductSelectedForExchange = () => {};

  return (
    <div className="px-2 w-full h-[36px] flex items-center justify-center mt-1">
      {" "}
      {/* Adjusted height and spacing */}
      <Button
        disabled={!isCTAClickEnabled}
        text={isSelectionButtonEnabled ? "Seleccionar" : "¡Me interesa!"}
        size="md" // Adjusted button size
        onClick={() => {
          if (isSelectionButtonEnabled) {
            isProductSelectedForExchange();
          }
          if (!isSelectionButtonEnabled) {
            redirectToProductDetails();
          }
        }}
      />
    </div>
  );
}
