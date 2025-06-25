import { Badge } from "@/types/enums";
import { Filters } from "../market/_hooks/useDepartment";
import BadgeTag from "@/components/badges/badge";
import SmallInput from "@/components/textInput/smallInput";
import SmallCheckBox from "@/components/checkbox/smallCheckbox";
import SmallSelect from "@/components/select/smallSelect";
import { useState } from "react";
import Modal from "@/components/modal/modal";

export type FilterProps = {
  brands: string[];
  minPrice: number;
  maxPrice: number;
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
          {brands.map((brand) => (
            <SmallCheckBox id={brand} name={brand} key={brand} label={brand} onChange={() => {}} checked />
          ))}
        </div>
      </div>
      {/* Price filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Precio</label>
        <div className="w-full flex items-center gap-2">
          <SmallInput
            hasLabel
            labelText="Desde"
            value={minPrice}
            placeholder={minPrice.toString()}
            onChange={() => {}}
          />
          <SmallInput
            hasLabel
            labelText="Hasta"
            value={maxPrice}
            placeholder={maxPrice.toString()}
            onChange={() => {}}
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
        <div className="flex flex-col w-full items-start gap-2">
          {badges.map((badge) => (
            <div key={badge} className="flex items-center w-full">
              <BadgeTag
                type={badge as Badge}
                selected={badges.includes(badge as Badge)}
                // onClick={() =>
                //   setBadges((prev) =>
                //     prev.includes(badge as Badge) ? prev.filter((b) => b !== badge) : [...prev, badge as Badge]
                //   )
                // }
              />
            </div>
          ))}
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
      <section className="hidden sm:block w-full sm:w-[40%] md:w-[33.3%] lg:w-[25%] xl:w-[20%] h-full mb-4">
        {filterContent}
      </section>
      {/* Mobile: Modal */}
      <Modal title="Filtros" close={() => setShowMobileFilters(false)} isOpen={showMobileFilters}>
        {filterContent}
      </Modal>
    </>
  );
}
