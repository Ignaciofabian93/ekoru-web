import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../button";

describe("Button component", () => {
  it("renders with provided text", () => {
    render(<Button text="Click Me" />);
    expect(screen.getByRole("button", { name: "Click Me" })).toBeInTheDocument();
  });

  it("applies primary variant styles by default", () => {
    render(<Button text="Primary Button" />);
    const button = screen.getByRole("button", { name: "Primary Button" });
    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("text-[#f7f7f7]");
  });

  it("applies secondary variant styles", () => {
    render(<Button text="Secondary Button" variant="secondary" />);
    const button = screen.getByRole("button", { name: "Secondary Button" });
    expect(button).toHaveClass("bg-secondary");
    expect(button).toHaveClass("text-primary");
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button text="Click Me" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Click Me" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(<Button text="Disabled" onClick={handleClick} disabled />);
    const button = screen.getByRole("button", { name: "Disabled" });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
