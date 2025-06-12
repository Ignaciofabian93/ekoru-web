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
  NEW: "bg-blue-200 text-blue-900",
  USED: "bg-yellow-200 text-yellow-900",
  SLIGHT_DAMAGE: "bg-red-200 text-red-900",
  WORN: "bg-orange-200 text-orange-900",
  FOR_REPAIR: "bg-purple-200 text-purple-900",
  REFURBISHED: "bg-teal-200 text-teal-900",
  EXCHANGEABLE: "bg-pink-200 text-pink-900",
  LAST_PRICE: "bg-indigo-200 text-indigo-900",
  FOR_GIFT: "bg-amber-200 text-amber-900",
  OPEN_TO_OFFERS: "bg-lime-200 text-lime-900",
  OPEN_BOX: "bg-cyan-200 text-cyan-900",
  CRUELTY_FREE: "bg-fuchsia-200 text-fuchsia-900",
  DELIVERED_TO_HOME: "bg-violet-200 text-violet-900",
  IN_HOUSE_PICKUP: "bg-gray-200 text-gray-900",
  IN_MID_POINT_PICKUP: "bg-sky-200 text-sky-900",
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
  NEW: "Nuevo",
  USED: "Usado",
  SLIGHT_DAMAGE: "Ligero Daño",
  WORN: "Desgastado",
  FOR_REPAIR: "Para Reparar",
  REFURBISHED: "Reacondicionado",
  EXCHANGEABLE: "Intercambiable",
  LAST_PRICE: "Último Precio",
  FOR_GIFT: "Para Regalo",
  OPEN_TO_OFFERS: "Abierto a Ofertas",
  OPEN_BOX: "Caja Abierta",
  CRUELTY_FREE: "Libre de Crueldad",
  DELIVERED_TO_HOME: "Entregado a Domicilio",
  IN_HOUSE_PICKUP: "Recogida en Casa",
  IN_MID_POINT_PICKUP: "Recogida en Punto Medio",
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
