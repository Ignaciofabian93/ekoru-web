import React from "react";

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement | HTMLQuoteElement | HTMLAnchorElement> & {
  as?: "p" | "blockquote" | "a";
  children: React.ReactNode;
  className?: string;
  // Accessibility
  role?: string;
  tabIndex?: number;
  ariaLabel?: string;
  href?: string; // Only for anchor
  target?: string; // Only for anchor
  rel?: string; // Only for anchor
};

const baseStyles: Record<string, string> = {
  p: "text-base leading-relaxed",
  blockquote: "border-l-4 border-gray-300 pl-4 italic text-gray-600",
  a: "text-primary underline hover:text-green-800 transition-colors",
};

const Paragraph: React.FC<ParagraphProps> = ({
  as = "p",
  children,
  className = "",
  role,
  tabIndex,
  ariaLabel,
  href,
  target,
  rel,
  ...rest
}) => {
  const Tag = as as any;
  const extraProps = as === "a" ? { href, target, rel } : {};

  return (
    <Tag
      className={`${baseStyles[as]} ${className}`}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      {...extraProps}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Paragraph;
