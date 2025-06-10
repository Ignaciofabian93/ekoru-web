import React from "react";
import clsx from "clsx";
import type { Product } from "@/types/product";

type BadgeType = Product["badges"][number];

const badgeStyles: Record<BadgeType, string> = {
  POPULAR: "bg-blue-100 text-blue-800",
  DISCOUNTED: "bg-red-100 text-red-800",
  WOMAN_OWNED: "bg-pink-100 text-pink-800",
  ECO_FRIENDLY: "bg-green-100 text-green-800",
  BEST_SELLER: "bg-yellow-100 text-yellow-800",
  TOP_RATED: "bg-purple-100 text-purple-800",
  COMMUNITY_FAVORITE: "bg-indigo-100 text-indigo-800",
  LIMITED_TIME_OFFER: "bg-orange-100 text-orange-800",
  FLASH_SALE: "bg-rose-100 text-rose-800",
  BEST_VALUE: "bg-teal-100 text-teal-800",
  HANDMADE: "bg-amber-100 text-amber-800",
  SUSTAINABLE: "bg-lime-100 text-lime-800",
  SUPPORTS_CAUSE: "bg-cyan-100 text-cyan-800",
  FAMILY_BUSINESS: "bg-fuchsia-100 text-fuchsia-800",
  CHARITY_SUPPORT: "bg-violet-100 text-violet-800",
  LIMITED_STOCK: "bg-gray-100 text-gray-800",
  SEASONAL: "bg-green-200 text-green-900",
  FREE_SHIPPING: "bg-sky-100 text-sky-800",
};

const badgeLabels: Record<BadgeType, string> = {
  POPULAR: "Popular",
  DISCOUNTED: "Descuento",
  WOMAN_OWNED: "Empresa de Mujer",
  ECO_FRIENDLY: "Ecológico",
  BEST_SELLER: "Más Vendido",
  TOP_RATED: "Mejor Calificado",
  COMMUNITY_FAVORITE: "Favorito Comunidad",
  LIMITED_TIME_OFFER: "Oferta Limitada",
  FLASH_SALE: "Venta Flash",
  BEST_VALUE: "Mejor Valor",
  HANDMADE: "Hecho a Mano",
  SUSTAINABLE: "Sustentable",
  SUPPORTS_CAUSE: "Apoya una Causa",
  FAMILY_BUSINESS: "Negocio Familiar",
  CHARITY_SUPPORT: "Apoya Caridad",
  LIMITED_STOCK: "Stock Limitado",
  SEASONAL: "Estacional",
  FREE_SHIPPING: "Envío Gratis",
};

type BadgeProps = {
  type: BadgeType;
  className?: string;
};

const Badge: React.FC<BadgeProps> = ({ type, className }) => (
  <span className={clsx("inline-block px-3 py-1 rounded-full text-xs font-semibold", badgeStyles[type], className)}>
    {badgeLabels[type]}
  </span>
);

export default Badge;
