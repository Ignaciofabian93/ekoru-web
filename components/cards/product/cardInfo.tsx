import ExchangeButton from "@/components/buttons/exchangeButton";
import clsx from "clsx";

type CardInfoProps = {
  seller: string;
  sellerImage: string;
  location: string;
  title: string;
  description: string;
  price: number;
  isExchangeable?: boolean;
  interests?: string[];
  isButtonActivated?: boolean;
};

export default function CardInfo({
  title,
  description,
  price,
  isExchangeable,
  interests,
  isButtonActivated,
}: CardInfoProps) {
  return (
    <div
      className={clsx("relative w-full flex flex-col items-center justify-between px-3 pt-2", {
        "h-[110px]": !isExchangeable,
        "h-[200px]": isExchangeable,
      })}
    >
      <div className="w-full flex flex-col gap-0.5">
        <p className="text-lg font-semibold truncate">{title}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>
      {isExchangeable ? (
        <div className="w-full flex flex-col items-start mt-2 relative">
          <span className="text-sm font-semibold text-primary-dark">Intereses</span>
          <div className="flex flex-col items-start">
            {interests?.length &&
              interests.map((int) => (
                <span key={int} className="text-xs text-gray-600 mt-1 inline-block">
                  {int}
                </span>
              ))}
          </div>
          <div className="flex items-center absolute bottom-5 right-1 px-3">
            <ExchangeButton onClick={() => (isButtonActivated ? null : null)} />
          </div>
        </div>
      ) : (
        <p className="text-xl font-bold text-primary">${price?.toLocaleString()}</p>
      )}
    </div>
  );
}
