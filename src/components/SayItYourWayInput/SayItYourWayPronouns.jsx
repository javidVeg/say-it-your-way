import React, { useMemo, useState, useEffect } from "react";
import "./styles.css";
import { pronouns } from "../../data/pronouns";
import MultiSelect from "./components/MultiSelect";

const SayItYourWayPronouns = (props) => {
  const {
    onChange,
    inputComponent: InputComponent,
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

      const matchedPronouns = optionsArray.filter((obj) =>
        selectedValues.includes(obj.nominative)
      );

      setSelectedPronouns(matchedPronouns.reverse());
    }
  }, [value, optionsArray]);

  const handlePronounsChange = (newSelectedPronouns) => {
    if (!Array.isArray(newSelectedPronouns)) {
      console.error("newSelectedPronouns is not an array", newSelectedPronouns);
      return;
    }

    const finalValue = formatPronounsForReturn(newSelectedPronouns);
    onChange(finalValue); // Send formatted value back to parent
  };

  const formatPronounsForReturn = (selectedPronouns) => {
    const selectedGroups = optionsArray.filter((option) =>
      selectedPronouns.includes(option[0])
    );

    if (selectedGroups.length === 1) {
      return selectedGroups[0].join("/");
    } else if (selectedGroups.length > 1) {
      const reversedSelectedGroups = selectedGroups.reverse();

      return reversedSelectedGroups.map((group) => group[0]).join("/");
    }
    return "";
  };

  return (
    <div className={`input-container ${disabled ? "disabled" : ""}`}>
      <MultiSelect
        className={disabled ? "disabled" : ""}
        selected={selectedPronouns}
        value={value || ""}
        onChange={handlePronounsChange}
        placeholder={!value ? placeholder : undefined}
        label={label}
        disabled={disabled}
        options={optionsArray}
        variant={variant}
      />

      {!error && helperText && <p className="helper-text">{helperText}</p>}
      {error && <p className="error-text">Error: {error}</p>}
    </div>
  );
};

export default SayItYourWayPronouns;
