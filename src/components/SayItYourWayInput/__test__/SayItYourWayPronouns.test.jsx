import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SayItYourWayPronouns from "../SayItYourWayPronouns";
import { pronouns } from "../../../data/pronouns";
import "@testing-library/jest-dom";

describe("SayItYourWayPronouns Component", () => {
  const mockOnChange = jest.fn();

  const setup = (props = {}) => {
    const defaultProps = {
      onChange: mockOnChange,
      label: "Preferred Pronouns",
      value: "",
      customOptions: pronouns,
      placeholder: "Select Pronouns",
      ...props,
    };

    return render(<SayItYourWayPronouns {...defaultProps} />);
  };

  it("renders correctly with the default options", () => {
    setup();

    expect(screen.getByText("Preferred Pronouns")).toBeInTheDocument(); // checks if the label is rendered

    const triggerDiv = screen.getByText("Select Pronouns"); // checks if the trigger div is rendered
    fireEvent.click(triggerDiv); // opens the dropdown

    // checks if each pronoun is rendered
    pronouns.forEach((pronoun) => {
      expect(
        screen.getByLabelText(`${pronoun.nominative}/${pronoun.accusative}`)
      ).toBeInTheDocument();
    });
  });

  it("allows selecting a pronoun and calls onChange", () => {
    setup();

    const triggerDiv = screen.getByText("Select Pronouns");
    fireEvent.click(triggerDiv); // opens the dropdown

    const pronounOption = screen.getByLabelText("they/them");
    fireEvent.click(pronounOption);

    fireEvent.click(triggerDiv); // closes the dropdown

    expect(pronounOption.checked).toBe(true);
    expect(mockOnChange).toHaveBeenCalledWith("they/them");
  });

  it("allows selecting multiple pronouns and formats the return value", () => {
    setup();

    const triggerDiv = screen.getByText("Select Pronouns");
    fireEvent.click(triggerDiv);

    const theyOption = screen.getByLabelText("they/them");
    const xeOption = screen.getByLabelText("xe/xem");

    fireEvent.click(theyOption);
    fireEvent.click(xeOption);

    fireEvent.click(triggerDiv);

    expect(theyOption.checked).toBe(true);
    expect(xeOption.checked).toBe(true);
    expect(mockOnChange).toHaveBeenCalledWith("they/xe"); // checks if the onChange function is called with the correct value
  });

  it("handles deselecting a pronoun", () => {
    setup();

    const triggerDiv = screen.getByText("Select Pronouns");
    fireEvent.click(triggerDiv);

    const theyOption = screen.getByLabelText("they/them");
    fireEvent.click(theyOption); // Selects "they/them"
    fireEvent.click(theyOption); // Deselects "they/them"

    expect(theyOption.checked).toBe(false);
    expect(mockOnChange).toHaveBeenCalledWith("");
  });

  it("ensures the value is in the same order of selection and handles more than two selections", () => {
    setup();

    const triggerDiv = screen.getByText("Select Pronouns");
    fireEvent.click(triggerDiv);

    const theyOption = screen.getByLabelText("they/them");
    fireEvent.click(theyOption);

    const xeOption = screen.getByLabelText("xe/xem");
    fireEvent.click(xeOption);

    const sheOption = screen.getByLabelText("she/her");
    fireEvent.click(sheOption);

    fireEvent.click(triggerDiv);

    expect(theyOption.checked).toBe(true);
    expect(xeOption.checked).toBe(true);
    expect(sheOption.checked).toBe(true);

    // ensures that the onChange function is called with the values in the same order as selected
    expect(mockOnChange).toHaveBeenCalledWith("they/xe/she");
  });

  it("ensures the value is in the same order of selection when deselecting and the value returns to the original set i.e. he/him", () => {
    setup();

    const triggerDiv = screen.getByText("Select Pronouns");
    fireEvent.click(triggerDiv);

    const sheOption = screen.getByLabelText("she/her");
    fireEvent.click(sheOption);

    const theyOption = screen.getByLabelText("they/them");
    fireEvent.click(theyOption);

    const xeOption = screen.getByLabelText("xe/xem");
    fireEvent.click(xeOption);
    fireEvent.click(xeOption);
    fireEvent.click(theyOption);

    fireEvent.click(triggerDiv);

    expect(theyOption.checked).toBe(false);
    expect(xeOption.checked).toBe(false);
    expect(sheOption.checked).toBe(true);

    // ensures that the onChange function is called with the values in the same order as selected
    expect(mockOnChange).toHaveBeenCalledWith("she/her");
  });

  it("renders helper text when provided", () => {
    setup({ helperText: "This is some testing helper text" });

    expect(
      screen.getByText("This is some testing helper text")
    ).toBeInTheDocument();
  });

  it("renders error text when error prop is provided", () => {
    setup({ error: "There is a testing error" });

    expect(
      screen.getByText("Error: There is a testing error")
    ).toBeInTheDocument();
  });
});
