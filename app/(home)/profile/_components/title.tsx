import clsx from "clsx";

export default function SectionTitle({ title }: { title: string }) {
  return (
    <div
      className={clsx(
        "w-full max-w-[400px]",
        "flex items-center justify-center",
        "rounded-[11px]",
        "border-[4px] border-primary bg-white",
        "shadow-sm shadow-slate-950/25",
        "my-4 py-2 px-2"
      )}
    >
      <span className="w-[10px] h-[10px] rounded-full bg-primary mx-2" />
      <h1 className="text-[20px] font-bold">{title}</h1>
      <span className="w-[10px] h-[10px] rounded-full bg-primary mx-2" />
    </div>
  );
}
