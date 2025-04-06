type Button = React.ComponentProps<"button"> & {
  text: string;
};

export default function Button({ text, onClick, className, ...rest }: Button) {
  return (
    <button onClick={onClick} className={`${className}`} {...rest}>
      {text}
    </button>
  );
}
