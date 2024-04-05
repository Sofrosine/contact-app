import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CardContact from "../CardContact";

describe("CardContact component", () => {
  const mockContact = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    age: 30,
    photo: "https://example.com/photo.jpg",
  };

  test("renders card contact correctly", () => {
    render(
      <Router>
        <CardContact item={mockContact} />
      </Router>
    );

    const nameElement = screen.getByText("John Doe");
    const ageElement = screen.getByText("30 years old");
    const imageElement = screen.getByAltText("card-contact-img");
    const buttonElement = screen.getByText("Detail");

    expect(nameElement).toBeInTheDocument();
    expect(ageElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('displays default photo if photo is "N/A"', () => {
    const contactWithDefaultPhoto = { ...mockContact, photo: "N/A" };

    render(
      <Router>
        <CardContact item={contactWithDefaultPhoto} />
      </Router>
    );

    const imageElement = screen.getByAltText("card-contact-img");
    expect(imageElement).toHaveAttribute(
      "src",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQQW8evYocVJa_sUjRKucO4U6qTPHmRLWeIixsej2Jlg&s"
    );
  });

  test("navigates to contact detail page when button is clicked", () => {
    const historyMock = { push: jest.fn() };

    render(
      <Router>
        <CardContact item={mockContact} />
      </Router>
    );

    const buttonElement = screen.getByText("Detail");
    buttonElement.click();

    // You can assert the navigation here using the history mock or a library like react-router-dom's memory history
  });
});
