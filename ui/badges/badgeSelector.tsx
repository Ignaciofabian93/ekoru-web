import React from "react";
import type { Product } from "@/types/product";
import Badge from "./badge";

type BadgeType = Product["badges"][number];

const STORE_BADGES: BadgeType[] = [
  "POPULAR",
  "DISCOUNTED",
  "WOMAN_OWNED",
  "ECO_FRIENDLY",
  "BEST_SELLER",
  "TOP_RATED",
  "COMMUNITY_FAVORITE",
  "LIMITED_TIME_OFFER",
  "FLASH_SALE",
  "BEST_VALUE",
  "HANDMADE",
  "SUSTAINABLE",
  "SUPPORTS_CAUSE",
  "FAMILY_BUSINESS",
  "CHARITY_SUPPORT",
  "LIMITED_STOCK",
  "SEASONAL",
  "FREE_SHIPPING",
];

const MARKET_BADGES: BadgeType[] = [
  "USED",
  "SLIGHT_DAMAGE",
  "WORN",
  "FOR_REPAIR",
  "REFURBISHED",
  "EXCHANGEABLE",
  "LAST_PRICE",
  "FOR_GIFT",
  "OPEN_TO_OFFERS",
  "OPEN_BOX",
  "CRUELTY_FREE",
  "DELIVERED_TO_HOME",
  "IN_HOUSE_PICKUP",
  "IN_MID_POINT_PICKUP",
];

type BadgeSelectorProps = {
  value: BadgeType[];
  onChange: (badges: BadgeType[]) => void;
  isCompany: boolean;
};

const BadgeSelector: React.FC<BadgeSelectorProps> = ({ value, onChange, isCompany }) => {
  const handleToggle = (badge: BadgeType) => {
    if (value.includes(badge)) {
      onChange(value.filter((b) => b !== badge));
    } else {
      onChange([...value, badge]);
    }
  };

  const ALL_BADGES = isCompany ? STORE_BADGES : MARKET_BADGES;

  return (
    <div className="p-4 bg-white border-[0.5px] border-primary rounded-[11px] mt-2 mb-6">
      <div className="flex flex-wrap gap-2 mb-8 justify-evenly">
        {ALL_BADGES.map((badge) => (
          <button type="button" key={badge} onClick={() => handleToggle(badge)} className="focus:outline-none">
            <Badge type={badge} className={value.includes(badge) ? "ring-2 ring-primary" : "opacity-60"} />
          </button>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Seleccionadas:</label>
        <div className="flex flex-wrap gap-2">
          {value.length === 0 && <span className="text-gray-400 text-xs">Ninguna</span>}
          {value.map((badge) => (
            <Badge key={badge} type={badge} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgeSelector;
