import React, { useState } from "react";

// MultiSelect component
const MultiSelect = (props) => {
  const { options = [], placeholder = "Select pronouns...", disabled } = props;

  const [selectedPronouns, setSelectedPronouns] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Handle the selection of pronouns
  const handlePronounChange = (nominative) => {
    setSelectedPronouns((prevSelected) => {
      if (prevSelected.some((pronoun) => pronoun.nominative === nominative)) {
        // If pronoun is already selected, remove it
        return prevSelected.filter((pronoun) => pronoun.nominative !== nominative);
      } else {
        // If not, add it to the list
        const selectedPronoun = options.find((pronoun) => pronoun.nominative === nominative);
        return [...prevSelected, selectedPronoun];
      }
    });
  };

  // Display selected nominative values separated by "/"
  const getDisplayValue = () => {
    return selectedPronouns.map((pronoun) => pronoun.nominative).join(" / ") || placeholder;
  };

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="multi-select-container">
      <div className={`multi-select-input ${disabled ? "disabled" : ""}`} onClick={toggleDropdown}>
        <span>{getDisplayValue()}</span>
        <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="multi-select-dropdown">
          {options.map((pronoun, index) => (
            <label key={index} className="multi-select-option">
              <input
                type="checkbox"
                value={pronoun.nominative}
                onChange={() => handlePronounChange(pronoun.nominative)}
                checked={selectedPronouns.some(
                  (selected) => selected.nominative === pronoun.nominative
                )}
              />
              {pronoun.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;