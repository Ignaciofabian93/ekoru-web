import { useRouter } from "next/navigation";
import Button from "@/components/buttons/button";

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
    <div className="px-4 w-full h-[40px] flex items-center justify-center mt-2">
      <Button
        disabled={!isCTAClickEnabled}
        text={isSelectionButtonEnabled ? "Seleccionar" : "¡Me interesa!"}
        size="lg"
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
