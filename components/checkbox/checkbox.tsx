import clsx from "clsx";

type CheckBox = {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CheckBox({ id, name, label, checked, onChange }: CheckBox) {
  return (
    <div className="w-full flex items-center justify-start mb-2 mt-2">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className={clsx(
          "appearance-none w-5 h-5 rounded-[6px] border-[2px] border-primary",
          "bg-white checked:bg-primary checked:border-primary",
          "transition-all duration-300 ease-in-out",
          "flex items-center justify-center"
        )}
      />
      <label htmlFor={id} className={clsx("ml-2 text-sm font-medium text-primary cursor-pointer select-none")}>
        {label}
      </label>
    </div>
  );
}
