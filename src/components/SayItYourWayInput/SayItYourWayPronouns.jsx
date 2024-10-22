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
  
      // Remove duplicates by checking IDs
      const uniquePronouns = matchedPronouns.filter(
        (pronoun, index, self) =>
          index === self.findIndex((p) => p.id === pronoun.id)
      );
  
      if (uniquePronouns.length > 0) {
        setSelectedPronouns(uniquePronouns);
      }
    }
  }, [value, optionsArray]);

  useEffect(() => {
    const finalValue = formatPronounsForReturn(selectedPronouns);

    onChange(finalValue);
  }, [selectedPronouns]);



  const handlePronounChange = (option) => {
    setSelectedPronouns((prevSelected) => {
      // Check if the option is already in the selected pronouns array
      const isAlreadySelected = prevSelected.some(
        (pronoun) => pronoun.id === option.id
      );
  
      if (isAlreadySelected) {
        return prevSelected.filter((pronoun) => pronoun.id !== option.id); // Removes duplicates
      } else {
        return [...prevSelected, option];
      }
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
    return selectedPronouns.some((item) => item.id === option.id);
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
