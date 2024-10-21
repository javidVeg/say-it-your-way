import React, { useState, useEffect } from "react";
import "./../styles.css";
import { ArrowIcon } from "./ArrowIcon";

const MultiSelect = ({
  value = "",
  selected = [],
  setSelected,
  onChange,
  options = [],
  placeholder = "Select pronouns...",
  disabled,
  label,
  variant = "standard",
  customStyles = {},
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isChecked = (option) => {
    return selected.some((item) => item.nominative === option.nominative);
  };

  const handlePronounChange = (option) => {
    const { nominative } = option;

    setSelected(() => {
      let updatedPronouns;

      const isAlreadySelected = selected.some(
        (pronoun) => pronoun.nominative === nominative
      );

      if (isAlreadySelected) {
        updatedPronouns = selected.filter(
          (pronoun) => pronoun.nominative !== nominative
        );
      } else {
        updatedPronouns = selected.concat(option);
      }
      console.log("handlePronounChange", updatedPronouns);
      onChange(updatedPronouns);
    });
  };

  const pronounsLabel = () => {
    console.log("selected in pronounsLabel", selected);
    if (selected.length === 0) {
      return placeholder;
    } else if (selected.length === 1) {
      return `${selected[0].nominative}/${selected[0].accusative}`;
    } else {
      return selected.map((item) => item.nominative).join("/");
    }
  };

  return (
    <div
      className={`siyw-select-container siyw-select-standard ${className}`}
      style={customStyles.container}
    >
      <label>{label}</label>
      <div
        className="siyw-select-input"
        onClick={() => setIsOpen(!isOpen)}
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
                readOnly
              />
              <label
                htmlFor={`pronoun-${index}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handlePronounChange(optionSet);
                }}
              >
                {`${optionSet.nominative}/${optionSet.accusative}`}
              </label>
            </div>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}></div>
      )}
    </div>
  );
};

export default MultiSelect;
