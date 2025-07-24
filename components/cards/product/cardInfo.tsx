import useTransactionStore from "@/app/(home)/transaction/_store/transaction";
import ExchangeButton from "@/components/buttons/exchangeButton";
import useMyProducts from "@/hooks/useMyProducts";
import useSessionStore from "@/store/session";
import clsx from "clsx";

type CardInfoProps = {
  seller: string;
  sellerImage: string;
  location: string;
  title: string;
  description: string;
  price: number;
  hasOffer?: boolean;
  offerPrice?: number;
  isExchangeable?: boolean;
  interests?: string[];
  isSelectionButtonEnabled?: boolean;
  isCTAClickEnabled?: boolean;
};

export default function CardInfo({
  title,
  description,
  price,
  isExchangeable,
  interests,
  isSelectionButtonEnabled = false,
  isCTAClickEnabled = true,
  hasOffer = false,
  offerPrice = 0,
}: CardInfoProps) {
  const { data } = useSessionStore();
  const { showModal } = useTransactionStore();
  const { MyProducts } = useMyProducts();

  const RenderPrice = () => {
    if (hasOffer) {
      return (
        <div className="flex flex-col items-center gap-1 w-full">
          <div className="flex items-start">
            <span className="bg-red-100 text-red-600 text-[10px] mr-2 font-bold px-2 py-0.2 rounded-full self-start">
              Oferta
            </span>
            <span className="text-xs font-medium text-gray-400 line-through">${price?.toLocaleString()}</span>
          </div>
          <span className="text-lg font-bold text-primary">${offerPrice?.toLocaleString()}</span>
        </div>
      );
    }
    return <p className="text-lg font-bold text-primary">${price?.toLocaleString()}</p>;
  };

  return (
    <div
      className={clsx("relative w-full flex flex-col items-center justify-between px-3 pt-2", {
        "h-[140px]": !isExchangeable,
        "h-[200px]": isExchangeable,
        "pb-2": isExchangeable && isSelectionButtonEnabled,
      })}
    >
      <div className="w-full flex flex-col gap-0.5">
        <p className="text-base font-semibold truncate">{title}</p>
        <p className="text-xs text-gray-600 line-clamp-2">{description}</p>
      </div>
      {isExchangeable && !isSelectionButtonEnabled && (
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
          <div className="flex items-center absolute bottom-12 right-1 z-50">
            <ExchangeButton
              disabled={!isCTAClickEnabled}
              onClick={(e) => {
                e.stopPropagation();
                if (!isSelectionButtonEnabled) {
                  showModal();
                  MyProducts({ variables: { userId: data.id } });
                } else {
                  return null;
                }
              }}
            />
          </div>
        </div>
      )}
      {isExchangeable && isSelectionButtonEnabled && (
        <div className="w-full flex flex-col items-start">
          <span className="text-sm font-semibold text-primary-dark">Intereses:</span>
          <div className="text-[10px] text-gray-600 mt-1 w-full">
            <span className="text-pretty">{interests?.join(", ")}</span>
          </div>
        </div>
      )}
      {!isSelectionButtonEnabled && !isExchangeable && <RenderPrice />}
    </div>
  );
}
