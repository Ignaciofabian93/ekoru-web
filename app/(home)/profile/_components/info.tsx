"use client";
import clsx from "clsx";
import SectionTitle from "./title";
import useSessionStore from "@/store/session";

const Row = ({ field, value }: { field: string; value: string }) => {
  return (
    <div className={clsx("w-full flex items-center justify-between", "py-2", "border-b-[1px] border-slate-300")}>
      <span className="text-[16px] font-semibold text-primary">{field}:</span>
      <span className="text-[16px] font-normal">{value}</span>
    </div>
  );
};

export default function PersonalInformation() {
  const { data } = useSessionStore();

  const accountTypes: { [key: string]: string } = {
    FREE: "Gratis",
    PLUS: "Plus",
    PREMIUM: "Premium",
  };

  return (
    <div className={clsx("w-full min-h-[400px] flex flex-col items-center justify-start", "mx-auto px-8 mb-8")}>
      <SectionTitle title="Información Personal" />
      <div className="w-full max-w-[800px] flex flex-col lg:flex-row lg:justify-between mt-6 lg:gap-6">
        <div className="w-full">
          <Row field="Tipo de suscripción" value={accountTypes[data.accountType]} />
          <Row field="Fecha de nacimiento" value={data.birthday} />
          <Row field="Comuna" value={data.county.county} />
          <Row field="Ciudad" value={data.city.city} />
          <Row field="Región" value={data.region.region} />
          <Row field="País" value={data.country.country} />
        </div>
      </div>
    </div>
  );
}
