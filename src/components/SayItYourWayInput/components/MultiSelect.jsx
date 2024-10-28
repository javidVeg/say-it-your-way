import React, { useState } from "react";

const MultiSelect = (props) => {
  const {
    value = "",
    options = [],
    placeholder,
    disabled,
    label,
    customStyles = {},
    className = "",
    handlePronounChange,
    isChecked,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
      <div
        className={`siyw-container ${className}`}
        style={customStyles.container}
      >
        <label>{label}</label>
        <div
          className="siyw-select-input"
          onClick={() => setIsOpen(!isOpen)}
          style={customStyles.input}
        >
          <span >{value || placeholder}</span>
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
