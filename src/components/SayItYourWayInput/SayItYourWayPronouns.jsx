import React, { useMemo, useState, useEffect } from "react";
import "./styles.css";
import { pronouns } from "../../data/pronouns";
import MultiSelect from "./components/MultiSelect";

const SayItYourWayPronouns = ({
  onChange,
  inputComponent: InputComponent, // Custom input component
  label,
  placeholder = "Please select...",
  helperText,
  error,
  disabled,
  value = "", // Incoming value (e.g., "she/they")
  customOptions,
  variant
}) => {
  const [finalOptions, setFinalOptions] = useState(() => {
    return customOptions ? customOptions : [...pronouns];
  });

  const [selectedPronouns, setSelectedPronouns] = useState([]);

  // Split incoming value and filter to find the matching nominative and accusative pairs
  useEffect(() => {
    if (value) {
      const selectedValues = value.split("/"); // Convert incoming string to array
      const matchedPronouns = finalOptions.filter(option =>
        selectedValues.includes(option[0]) // Find matching nominative forms
      ).map(option => option[0]); // Keep only the nominative forms for selection

      setSelectedPronouns(matchedPronouns); // Update selected pronouns with nominatives
    }
  }, [value, finalOptions]);

  // Handle logic when pronouns change
  const handlePronounsChange = (newSelectedPronouns) => {
    if (!Array.isArray(newSelectedPronouns)) {
      console.error("newSelectedPronouns is not an array", newSelectedPronouns);
      return;
    }

    const finalValue = formatPronounsForReturn(newSelectedPronouns);
    onChange(finalValue); // Send formatted value back to parent
  };

  // Format the final value to return based on selection logic
  const formatPronounsForReturn = (selectedPronouns) => {
    const selectedGroups = finalOptions.filter(option =>
      selectedPronouns.includes(option[0])
    );

    // Logic from flowchart
    if (selectedGroups.length === 1) {
      // If only one group selected, show both nominative and accusative
      return selectedGroups[0].join("/"); // e.g., "she/her"
    } else if (selectedGroups.length > 1) {
      // If more than one selected, show only nominatives
      return selectedGroups.map(group => group[0]).join("/"); // e.g., "she/they"
    }
    return "";
  };

  return (
    <div className={`input-container ${disabled ? "disabled" : ""}`}>
 
        <MultiSelect
          className={disabled ? "disabled" : ""}
          value={selectedPronouns} // Use the selected pronouns
          onChange={handlePronounsChange} // Handle change from MultiSelect
          placeholder={!value ? placeholder : undefined}
          label={label}
          disabled={disabled}
          options={finalOptions}
          variant={variant}
        />
  
      {!error && helperText && <p className="helper-text">{helperText}</p>}
      {error && <p className="error-text">Error: {error}</p>}
    </div>
  );
};

export default SayItYourWayPronouns;