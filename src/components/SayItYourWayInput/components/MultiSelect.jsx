import React, { useState, useEffect } from "react";
import "./../styles.css";
import { ArrowIcon } from "./ArrowIcon"

const MultiSelect = ({
  value = [],
  onChange,
  options = [],
  placeholder = "Select pronouns...",
  disabled,
  label,
  variant = "standard", 
  customStyles = {}, 
  className = "", 
}) => {
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

  const formatPronounsForDisplay = () => {
    const selectedGroups = options.filter((option) =>
      selectedPronouns.includes(option[0])
    );

    if (selectedGroups.length === 1) {
      return selectedGroups[0].join("/");
    } else if (selectedGroups.length > 1) {
      return selectedGroups.map((group) => group[0]).join("/");
    }

    return placeholder;
  };

  // Applying variant styles
  const variantClass = `siyw-select-${variant}`;

  return (
    <div
      className={`siyw-select-container ${variantClass} ${className}`}
      style={customStyles.container}
    >
      <label>{label}</label>
      <div
        className="siyw-select-input"
        onClick={toggleDropdown}
        style={customStyles.input}
      >
        <span>
          {selectedPronouns.length > 0
            ? formatPronounsForDisplay()
            : placeholder}
        </span>
        <>
          <ArrowIcon isOpen={isOpen} />
        </>
      </div>

      {isOpen && (
        <div className="siyw-select-dropdown" style={customStyles.dropdown}>
          {options.map((option, index) => (
            <div
              key={index}
              className="siyw-select-option"
              style={customStyles.option}
            >
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
