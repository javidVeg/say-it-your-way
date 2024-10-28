import React, { useState, useEffect } from "react";
import { pronouns } from "../../../data/pronouns";
import MultiSelect from "../components/MultiSelect";
import "./siyw-pronouns-styles.css";

const SIYWPronouns = (props) => {
  const {
    onChange,
    placeholder = "Please select...",
    helperText,
    errorText,
    disabled,
    value = "",
    customOptions,
    required,
  } = props;

  const [optionsArray] = useState(customOptions || pronouns);

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
    if (onChange) {
      onChange(finalValue);
    }
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

  const bottomHelperText = () => (
    required && errorText ? (
      <p className="error-text">{errorText}</p>
    ) : helperText ? (
      <p className="helper-text">{helperText}</p>
    ) : null
  );

  return (
    <>
      <MultiSelect
        value={value || ""}
        placeholder={!value ? placeholder : undefined}
        options={optionsArray}
        isChecked={isChecked}
        handlePronounChange={handlePronounChange}
        {...props}
      />

      {bottomHelperText()}
    </>
  );
};

export default SIYWPronouns;
