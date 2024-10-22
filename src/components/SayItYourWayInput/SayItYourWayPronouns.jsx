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
        .filter((obj) => obj !== undefined);

      if (matchedPronouns.length > 0) {
        setSelectedPronouns(matchedPronouns);
      }
    }
  }, [value, optionsArray]);
  

  useEffect(() => {
    const finalValue = formatPronounsForReturn(selectedPronouns);

    onChange(finalValue);
  }, [selectedPronouns]);


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

      return updatedPronouns;
    });
  };

  const formatPronounsForReturn = (selectedGroups) => {
    if (selectedGroups.length === 0) {
      return "";
    }

    if (selectedGroups.length > 1) {
      return selectedGroups.map((group) => group.nominative).join("/");
    } else {
      return `${selectedGroups[0].nominative}/${selectedGroups[0].accusative}`;
    }
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
        value={value || ""}
        onChange={handlePronounChange}
        placeholder={!value ? placeholder : undefined}
        label={label}
        disabled={disabled}
        options={optionsArray}
        handlePronounChange={handlePronounChange}
        isChecked={isChecked}
      />

      {!error && helperText && <p className="helper-text">{helperText}</p>}
      {error && <p className="error-text">Error: {error}</p>}
    </>
  );
};

export default SayItYourWayPronouns;
