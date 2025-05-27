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
  return (
    <div className={clsx("w-full flex flex-col items-start justify-center", "mx-auto px-8")}>
      <SectionTitle title="Información Personal" />
      <div className="w-full flex flex-col lg:flex-row lg:justify-between mt-6 lg:gap-6">
        <div className="w-full">
          <Row field="Nombre" value={data.name} />
          <Row field="Apellidos" value={data.surnames} />
          <Row field="Dirección" value={data.address} />
          <Row field="Celular" value={data.phone} />
          <Row field="Correo" value={data.email} />
        </div>
        <div className="w-full">
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
