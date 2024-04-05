import { render, screen } from "@testing-library/react";
import Layout from "../index";

describe("Layout component", () => {
  test("renders children components correctly", () => {
    render(
      <Layout>
        <div>Child Component 1</div>
        <div>Child Component 2</div>
      </Layout>
    );

    const childComponent1 = screen.getByText("Child Component 1");
    const childComponent2 = screen.getByText("Child Component 2");

    expect(childComponent1).toBeInTheDocument();
    expect(childComponent2).toBeInTheDocument();
  });

  test("renders Header component", () => {
    render(
      <Layout>
        <div>Child Component</div>
      </Layout>
    );

    const headerComponent = screen.getByText("CONTACT APP");

    expect(headerComponent).toBeInTheDocument();
  });
});
