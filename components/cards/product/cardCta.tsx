import Button from "@/components/buttons/button";

type CardCTAProps = {
  isImpactActivated: boolean;
  isButtonActivated: boolean;
};

export default function CardCTA({ isButtonActivated }: CardCTAProps) {
  return (
    <div className="px-4 w-full h-[15%] flex items-center justify-center mt-4">
      {isButtonActivated && <Button text="¡Me interesa!" size="sm" />}
    </div>
  );
}
