import React, { useState, useEffect } from "react";
import "./../styles.css";
import { ArrowIcon } from "./ArrowIcon";

const MultiSelect = ({
  value = "",
  selected = [],
  onChange,
  options = [],
  placeholder = "Select pronouns...",
  disabled,
  label,
  variant = "standard",
  customStyles = {},
  className = "",
}) => {
  const [selectedPronouns, setSelectedPronouns] = useState(selected);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedPronouns(selected);
  }, [selected]);

  const isChecked = (option) => {
    return selectedPronouns.some(
      (item) => item.nominative === option.nominative
    );
  };

  const handlePronounChange = (option) => {
    const { nominative, accusative } = option;

    setSelectedPronouns((prevSelectedPronouns) => {
      let updatedPronouns;

      const isAlreadySelected = prevSelectedPronouns.some(
        (pronoun) => pronoun.nominative === nominative
      );

      if (isAlreadySelected) {
        updatedPronouns = prevSelectedPronouns.filter(
          (pronoun) => pronoun.nominative !== nominative
        );
      } else {
        updatedPronouns = [...prevSelectedPronouns, { nominative, accusative }];
      }

      onChange(updatedPronouns);

      return updatedPronouns;
    });
  };

  const pronounsLabel = () => {
    if (selectedPronouns.length === 0) {
      return placeholder;
    } else if (selectedPronouns.length === 1) {
      return `${selectedPronouns[0].nominative}/${selectedPronouns[0].accusative}`;
    } else {
      return selectedPronouns.map((item) => item.nominative).join("/");
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

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
        <span>{pronounsLabel()}</span>
        <ArrowIcon isOpen={isOpen} />
      </div>

      {isOpen && (
        <div className="siyw-select-dropdown" style={customStyles.dropdown}>
          {options.map((optionSet, index) => (
            <div
              key={index}
              className="siyw-select-option"
              style={customStyles.option}
              onClick={() => handlePronounChange(optionSet)}
            >
              <input
                type="checkbox"
                id={`pronoun-${index}`}
                checked={isChecked(optionSet)}
                disabled={disabled}
              />
              <label htmlFor={`pronoun-${index}`}>
                {`${optionSet.nominative}/${optionSet.accusative}`}
              </label>
            </div>
          ))}
        </div>
      )}

      {isOpen && <div className="overlay" onClick={closeDropdown}></div>}
    </div>
  );
};

export default MultiSelect;
