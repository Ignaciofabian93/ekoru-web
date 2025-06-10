import React from "react";

type TitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
  // Accessibility
  role?: string;
  tabIndex?: number;
  ariaLabel?: string;
};

const baseStyles: Record<string, string> = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-semibold",
  h3: "text-2xl font-semibold",
  h4: "text-xl font-medium",
  h5: "text-lg font-medium",
  h6: "text-base font-medium",
};

const Title: React.FC<TitleProps> = ({ as = "h1", children, className = "", role, tabIndex, ariaLabel, ...rest }) => {
  const Tag = as;
  return (
    <Tag className={`${baseStyles[as]} ${className}`} role={role} tabIndex={tabIndex} aria-label={ariaLabel} {...rest}>
      {children}
    </Tag>
  );
};

export default Title;
