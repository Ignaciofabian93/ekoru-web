import Button from "@/components/buttons/button";

type CardCTAProps = {
  isButtonActivated: boolean;
};

export default function CardCTA({ isButtonActivated }: CardCTAProps) {
  return (
    <div className="px-4 w-full h-[40px] flex items-center justify-center mt-2">
      <Button text="¡Me interesa!" size="lg" onClick={() => (isButtonActivated ? null : null)} />
    </div>
  );
}
