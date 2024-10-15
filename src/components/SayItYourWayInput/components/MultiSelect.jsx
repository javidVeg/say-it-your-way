import React, { useState, useEffect } from "react";

const MultiSelect = (props) => {
  const {
    options = [], 
    placeholder = "Select pronouns...",
    disabled,
    label,
    value = [],
    onChange,
  } = props;

  const [selectedPronouns, setSelectedPronouns] = useState(value); 
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedPronouns(value);
  }, [value]);

  const isChecked = (option) => {
    return selectedPronouns.includes(option[0]); 
  };

  const handlePronounChange = (option) => {
    setSelectedPronouns((prevSelectedPronouns) => {
      let updatedPronouns;
      const [nominative, accusative] = option; 

      if (prevSelectedPronouns.includes(nominative)) {
        updatedPronouns = prevSelectedPronouns.filter(
          (pronoun) => pronoun !== nominative && pronoun !== accusative
        );
      } else {
        updatedPronouns = [...prevSelectedPronouns, nominative, accusative];
      }

      onChange(updatedPronouns); 
      return updatedPronouns;
    });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="custom-select-container">
      <label>{label}</label>
      <div className="custom-select-input" onClick={toggleDropdown}>
        <span>{selectedPronouns.length > 0 ? selectedPronouns.join("/") : placeholder}</span>
        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="custom-select-dropdown">
          {options.map((option, index) => (
            <div key={index} className="custom-select-option">
              <input
                type="checkbox"
                id={`pronoun-${index}`}
                checked={isChecked(option)}
                onChange={() => handlePronounChange(option)}
                disabled={disabled}
              />
              <label htmlFor={`pronoun-${index}`}>{option.join("/")}</label>
            </div>
          ))}
        </div>
      )}

      {isOpen && <div className="overlay" onClick={closeDropdown}></div>}
    </div>
  );
};

export default MultiSelect;