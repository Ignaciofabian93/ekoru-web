import clsx from "clsx";

type CheckBox = {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SmallCheckBox({ id, name, label, checked, onChange }: CheckBox) {
  return (
    <div className="w-fit h-fit flex items-center justify-start">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className={clsx(
          "appearance-none w-[12px] h-[12px] rounded-[2px] border-[2px] border-primary",
          "bg-white checked:bg-primary checked:border-primary",
          "transition-all duration-300 ease-in-out",
          "flex items-center justify-center"
        )}
      />
      <label htmlFor={id} className={clsx("ml-2 text-sm text-main cursor-pointer select-none")}>
        {label}
      </label>
    </div>
  );
}
