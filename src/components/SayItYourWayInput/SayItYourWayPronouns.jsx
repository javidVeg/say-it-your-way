import React, { useState, useEffect } from "react";
import "./styles.css";
import { pronouns } from "../../data/pronouns";
import MultiSelect from "./components/MultiSelect";

const SayItYourWayPronouns = ({
  onChange,
  inputComponent: InputComponent,
  label,
  placeholder = "Please select...",
  helperText,
  error,
  disabled,
  value = "", 
  customOptions,
}) => {
  const [finalOptions, setFinalOptions] = useState(() => {
    return customOptions ? customOptions : [...pronouns];
  });

  const [selectedPronouns, setSelectedPronouns] = useState([]);

  useEffect(() => {
    if (value) {
      const selectedValues = value.split("/");

      const matchedPronouns = finalOptions.filter(option =>
        selectedValues.includes(option[0]) 
      ).map(option => option[0]);

      setSelectedPronouns(matchedPronouns);
    }
  }, [value, finalOptions]);

  const handlePronounsChange = (newSelectedPronouns) => {
    if (!Array.isArray(newSelectedPronouns)) {
      console.error("newSelectedPronouns is not an array", newSelectedPronouns);
      return;
    }

    const finalPronouns = formatPronounsForDisplay(newSelectedPronouns);

    onChange(finalPronouns);
  };

  const formatPronounsForDisplay = (selectedPronouns) => {
    const selectedGroups = finalOptions.filter(option =>
      selectedPronouns.includes(option[0])
    );

    if (selectedGroups.length === 1) {
      return selectedGroups[0].join("/"); 
    }

    return selectedPronouns.join("/"); 
  };

  return (
    <div className={`input-container ${disabled ? "disabled" : ""}`}>
      {InputComponent ? (
        <InputComponent
          value={value || ""}
          onChange={handlePronounsChange}
          disabled={disabled}
          options={finalOptions}
          placeholder={placeholder}
          label={label}
        />
      ) : (
        <MultiSelect
          className={disabled ? "disabled" : ""}
          value={selectedPronouns} 
          onChange={handlePronounsChange}
          placeholder={!value ? placeholder : undefined}
          label={label}
          disabled={disabled}
          options={finalOptions}
        />
      )}
      {!error && helperText && <p className="helper-text">{helperText}</p>}
      {error && <p className="error-text">Error: {error}</p>}
    </div>
  );
};

export default SayItYourWayPronouns;