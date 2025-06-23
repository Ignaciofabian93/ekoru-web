type SectionTitle = {
  sectionName?: string;
  title?: string;
  subtitle?: string;
};

export default function SectionTitle({ sectionName, title, subtitle }: SectionTitle) {
  return (
    <div className="w-full relative flex flex-col lg:flex-row items-start justify-start gap-4 mb-8">
      <div className="w-full h-[56px] md:absolute md:left-0 flex items-center justify-start">
        <div className="bg-primary w-6 h-full" />
        <h2 className="text-lg font-semibold uppercase ml-4">{sectionName}</h2>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center mx-auto">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-base text-main italic">{subtitle}</p>
      </div>
    </div>
  );
}
