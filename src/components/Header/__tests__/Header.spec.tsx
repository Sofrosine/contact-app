import { render, screen } from "@testing-library/react";
import Header from "../index";

describe("Header component", () => {
  test("renders header correctly", () => {
    render(<Header />);

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass("bg-primary");
    expect(headerElement).toHaveClass("sticky");
    expect(headerElement).toHaveClass("top-0");
    expect(headerElement).toHaveClass("w-full");
    expect(headerElement).toHaveClass("py-3");
    expect(headerElement).toHaveClass("px-4");
    expect(headerElement).toHaveClass("text-center");
    expect(headerElement).toHaveClass("shadow-md");

    const textElement = screen.getByText("CONTACT APP");
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass("text-xl");
    expect(textElement).toHaveClass("font-bold");
    expect(textElement).toHaveClass("text-white");
  });
});
