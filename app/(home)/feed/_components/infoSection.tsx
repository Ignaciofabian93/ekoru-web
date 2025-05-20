import InfoCard from "@/components/cards/infoCard";
import clsx from "clsx";

export default function InfoSection() {
  return (
    <section className={clsx("w-[90%]", "mx-auto my-4")}>
      <InfoCard />
    </section>
  );
}
