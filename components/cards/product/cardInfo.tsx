import useTransactionStore from "@/app/(home)/transaction/_store/transaction";
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
  const { showModal } = useTransactionStore();
  return (
    <div
      className={clsx("relative w-full flex flex-col items-center justify-between px-3 pt-2", {
        "h-[110px]": !isExchangeable,
        "h-[200px]": isExchangeable,
      })}
    >
      <div className="w-full flex flex-col gap-0.5">
        <p className="text-base font-semibold truncate">{title}</p>
        <p className="text-xs text-gray-600 line-clamp-2">{description}</p>
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
          <div className="flex items-center absolute bottom-12 right-0 z-50">
            <ExchangeButton onClick={() => (isButtonActivated ? showModal() : null)} />
          </div>
        </div>
      ) : (
        <p className="text-lg font-bold text-primary">${price?.toLocaleString()}</p>
      )}
    </div>
  );
}
