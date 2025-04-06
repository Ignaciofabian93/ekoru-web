type TextInput = React.ComponentProps<"input">;

export default function TextInput({ type, className, ...rest }: TextInput) {
  return (
    <input
      type={type}
      className={`${className} min-w-14 w-full max-w-52 h-10 border-[1px] rounded-md border-slate-800 mx-2`}
      {...rest}
    />
  );
}
