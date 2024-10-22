import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SayItYourWayPronouns from "../SayItYourWayPronouns"
import { pronouns } from "../../../data/pronouns"

describe("SayItYourWayPronouns Component", () => {
  const mockOnChange = jest.fn();

  const setup = (props = {}) => {
    const defaultProps = {
      onChange: mockOnChange,
      label: "Preferred Pronouns",
      value: "",
      customOptions: pronouns,
      ...props,
    };

    return render(<SayItYourWayPronouns {...defaultProps} />);
  };

  it("renders correctly with the default options", () => {
    setup();

    expect(screen.getByText("Preferred Pronouns")).toBeInTheDocument();
    pronouns.forEach((pronoun) => {
      expect(
        screen.getByLabelText(`${pronoun.nominative}/${pronoun.accusative}`)
      ).toBeInTheDocument();
    });
  });

  // it("allows selecting a pronoun and calls onChange", () => {
  //   setup();

  //   const pronounOption = screen.getByLabelText("they/them");
  //   fireEvent.click(pronounOption);

  //   expect(pronounOption.checked).toBe(true);
  //   expect(mockOnChange).toHaveBeenCalledWith("they/them");
  // });

  // it("allows selecting multiple pronouns and formats the return value", () => {
  //   setup();

  //   const theyOption = screen.getByLabelText("they/them");
  //   const xeOption = screen.getByLabelText("xe/xem");

  //   fireEvent.click(theyOption);
  //   fireEvent.click(xeOption);

  //   expect(theyOption.checked).toBe(true);
  //   expect(xeOption.checked).toBe(true);
  //   expect(mockOnChange).toHaveBeenCalledWith("they/xe");
  // });

  // it("handles deselecting a pronoun", () => {
  //   setup();

  //   const theyOption = screen.getByLabelText("they/them");
  //   fireEvent.click(theyOption); // Select "they/them"
  //   fireEvent.click(theyOption); // Deselect "they/them"

  //   expect(theyOption.checked).toBe(false);
  //   expect(mockOnChange).toHaveBeenCalledWith("");
  // });

  // it("renders helper text when provided", () => {
  //   setup({ helperText: "This is some helper text" });

  //   expect(screen.getByText("This is some helper text")).toBeInTheDocument();
  // });

  // it("renders error text when error prop is provided", () => {
  //   setup({ error: "There is an error" });

  //   expect(screen.getByText("Error: There is an error")).toBeInTheDocument();
  // });
});