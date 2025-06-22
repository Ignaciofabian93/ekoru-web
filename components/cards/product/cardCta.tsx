import Image from "next/image";
import co2 from "@/assets/icons/co2.png";
import Button from "@/components/buttons/button";

type CardCTAProps = {
  isImpactActivated: boolean;
  isButtonActivated: boolean;
};

export default function CardCTA({ isImpactActivated, isButtonActivated }: CardCTAProps) {
  return (
    <div className="px-4 w-full flex items-center justify-center mt-4">
      {isButtonActivated && <Button text="¡Me interesa!" size="sm" />}
    </div>
  );
}
