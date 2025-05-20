import CTACard from "@/components/cards/ctaCard";
import InfoCard from "@/components/cards/infoCard";
import clsx from "clsx";

export default function InfoSection() {
  return (
    <section
      className={clsx("w-[95%]", "mx-auto my-4 pb-4", "flex items-center justify-evenly gap-4", "overflow-x-scroll")}
    >
      <InfoCard />
      <CTACard />
    </section>
  );
}
