import { useState } from "react";
import { Badge } from "@/types/enums";
import { Filters } from "../market/types/filters";
import BadgeTag from "@/ui/badges/badge";
import SmallInput from "@/ui/textInput/smallInput";
import SmallCheckBox from "@/ui/checkbox/smallCheckbox";
import SmallSelect from "@/ui/select/smallSelect";
import Modal from "@/ui/modal/modal";

export type FilterProps = {
  brands: string[];
  minPrice: number | null;
  maxPrice: number | null;
  locations: string[];
  badges: Badge[];
  selectedFilters: Filters;
  onFilterChange: (filters: Filters) => void;
};

export default function ProductFilters({
  selectedFilters,
  onFilterChange,
  brands,
  minPrice,
  maxPrice,
  locations,
  badges,
}: FilterProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  // The filter content
  const filterContent = (
    <div className="bg-white rounded-lg shadow p-4 mb-4 md:mb-0">
      {/* Brand filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Marca</label>
        <div className="flex flex-col gap-1">
          {brands.length ? (
            brands.map((brand) => (
              <SmallCheckBox
                id={brand}
                name={brand}
                key={brand}
                label={brand}
                onChange={() => {
                  const isSelected = selectedFilters.brands.includes(brand);
                  const newBrands = isSelected
                    ? selectedFilters.brands.filter((b) => b !== brand)
                    : [...selectedFilters.brands, brand];
                  onFilterChange({ ...selectedFilters, brands: newBrands });
                }}
                checked={selectedFilters.brands.includes(brand)}
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No hay marcas disponibles</p>
          )}
        </div>
      </div>
      {/* Price filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Precio</label>
        <div className="w-full flex items-center gap-2">
          <SmallInput
            type="number"
            hasLabel
            labelText="Desde"
            value={selectedFilters.minPrice ?? ""}
            placeholder={minPrice?.toString() || "Min"}
            onChange={(e) => {
              onFilterChange({
                ...selectedFilters,
                minPrice: e.target.value ? Number(e.target.value) : null,
              });
            }}
          />
          <SmallInput
            type="number"
            hasLabel
            labelText="Hasta"
            value={selectedFilters.maxPrice ?? ""}
            placeholder={maxPrice?.toString() || "Max"}
            onChange={(e) =>
              onFilterChange({ ...selectedFilters, maxPrice: e.target.value ? Number(e.target.value) : null })
            }
          />
        </div>
      </div>
      <div className="mb-8">
        <SmallSelect
          name="location"
          options={locations.map((loc) => ({ label: loc, value: loc }))}
          value={selectedFilters.location}
          onChange={(value) => onFilterChange({ ...selectedFilters, location: value as string })}
          hasLabel
          labelText="Ubicación"
        />
      </div>
      {/* Badge filter */}
      <div className="mb-2">
        <label className="block text-sm font-medium mb-3">Etiquetas</label>
        <div className="flex flex-col w-full items-start gap-3">
          {badges.length ? (
            badges.map((badge) => (
              <div key={badge} className="flex items-center w-full">
                <BadgeTag
                  type={badge as Badge}
                  selected={selectedFilters.badges.includes(badge as Badge)}
                  onClick={() => {
                    const isSelected = selectedFilters.badges.includes(badge);
                    const newBadges = isSelected
                      ? selectedFilters.badges.filter((b) => b !== badge)
                      : [...selectedFilters.badges, badge];
                    onFilterChange({ ...selectedFilters, badges: newBadges });
                  }}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No hay etiquetas disponibles</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile: Show button */}
      <div className="flex items-center justify-center w-full sm:hidden mb-4">
        <button
          className="w-[80%] text-center px-4 py-2 text-primary-dark border-2 border-primary-light rounded-lg bg-white shadow-md shadow-black/10"
          onClick={() => setShowMobileFilters(true)}
        >
          Mostrar filtros
        </button>
      </div>
      {/* Desktop: Show sidebar */}
      <section className="hidden sm:block w-[230px] h-full mb-4">{filterContent}</section>
      {/* Mobile: Modal */}
      <Modal title="Filtros" close={() => setShowMobileFilters(false)} isOpen={showMobileFilters}>
        {filterContent}
      </Modal>
    </>
  );
}
