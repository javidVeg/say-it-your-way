import React, { useState, useEffect } from "react";
import "./styles.css";
import { pronouns } from "../../data/pronouns";
import MultiSelect from "./components/MultiSelect";

const SayItYourWayPronouns = (props) => {
  const {
    onChange,
    label,
    placeholder = "Please select...",
    helperText,
    error,
    disabled,
    value = "",
    customOptions,
    variant,
  } = props;

  const [optionsArray] = useState(() => {
    return customOptions ? customOptions : pronouns;
  });

  const [selectedPronouns, setSelectedPronouns] = useState([]);

  useEffect(() => {
    if (value) {
      const selectedValues = value.split("/");

      const matchedPronouns = selectedValues
        .map((val) => optionsArray.find((obj) => obj.nominative === val))
        .filter((obj) => obj !== undefined); // Skip undefined values

      if (matchedPronouns.length > 0) {
        setSelectedPronouns(matchedPronouns);
      }
    }
  }, [value, optionsArray]);

  const handlePronounChange = (option) => {
    const { nominative } = option;

    setSelectedPronouns((prevSelected) => {
      let updatedPronouns;

      const isAlreadySelected = prevSelected.some(
        (pronoun) => pronoun.nominative === nominative
      );

      if (isAlreadySelected) {
        updatedPronouns = prevSelected.filter(
          (pronoun) => pronoun.nominative !== nominative
        );
      } else {
        updatedPronouns = [...prevSelected, option];
      }
      console.log("updatedPronouns", updatedPronouns);

      const finalValue = formatPronounsForReturn(updatedPronouns);
      onChange(finalValue);

      return updatedPronouns;
    });
  };

  const formatPronounsForReturn = (selectedPronouns) => {
    const selectedGroups = optionsArray.filter((option) =>
      selectedPronouns.some(
        (selected) => selected.nominative === option.nominative
      )
    );

    if (selectedGroups.length === 1) {
      return `${selectedGroups[0].nominative}/${selectedGroups[0].accusative}`;
    } else if (selectedGroups.length > 1) {
      return selectedGroups.map((group) => group.nominative).join("/");
    }

    return "";
  };

  const isChecked = (option) => {
    return selectedPronouns.some(
      (item) => item.nominative === option.nominative
    );
  };

  return (
    <>
      <MultiSelect
        className={disabled ? "disabled" : ""}
        selected={selectedPronouns}
        setSelected={setSelectedPronouns}
        value={value || ""}
        onChange={handlePronounChange}
        placeholder={!value ? placeholder : undefined}
        label={label}
        disabled={disabled}
        options={optionsArray}
        variant={variant}
        handlePronounChange={handlePronounChange}
        isChecked={isChecked}
      />

      {!error && helperText && <p className="helper-text">{helperText}</p>}
      {error && <p className="error-text">Error: {error}</p>}
    </>
  );
};

export default SayItYourWayPronouns;
