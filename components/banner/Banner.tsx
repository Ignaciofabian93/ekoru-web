import clsx from "clsx";

type Banner = {
  title: string;
  description: string;
};

export default function Banner({ title, description }: Banner) {
  return (
    <article
      className={clsx(
        "w-[90%] h-[132px]",
        "flex flex-col items-center justify-center",
        "rounded-[11px]",
        "border-[5px] border-primary",
        "shadow-sm shadow-slate-950/25",
        "mx-auto",
      )}
    >
      <div className="flex items-center justify-center">
        <span className="w-[17px] h-[17px] rounded-full bg-primary mx-4" />
        <h4 className="text-[28px] uppercase">{title}</h4>
        <span className="w-[17px] h-[17px] rounded-full bg-primary mx-4" />
      </div>
      <p className="text-[24px]">{description}</p>
    </article>
  );
}
