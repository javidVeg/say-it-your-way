import React, { useState } from "react";

const MultiSelect = (props) => {
  const {
    options = [],
    placeholder = "Select pronouns...",
    disabled,
    label,
  } = props;
  const [pronouns, setPronouns] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleChange = (option) => {
    const { value } = option;

    setPronouns((prevPronouns) => {
      const alreadySelected =
        prevPronouns.includes(value) ||
        prevPronouns.includes(option.nominative);

      if (alreadySelected) {
        // if already selected, remove it
        const newPronouns = prevPronouns.filter(
          (pronoun) => pronoun !== value && pronoun !== option.nominative
        );

        // if only one pronoun is left, re-add the part after the '/'
        if (newPronouns.length === 1) {
          const firstPronounValue = options.find(
            (option) =>
              option.nominative === newPronouns[0] ||
              option.value === newPronouns[0]
          )?.value;
          return [firstPronounValue];
        }

        return newPronouns;
      } else {
        // if not selected, add it
        if (prevPronouns.length === 0) {
          return [value]; // first selection keeps the full value
        } else {
          const firstPronounWithoutSlash = prevPronouns[0].split("/")[0];

          // when adding additional selections, remove part after '/' for the first value
          const updatedPronouns = [
            firstPronounWithoutSlash,
            ...prevPronouns.slice(1),
            value.split("/")[0],
          ];

          return updatedPronouns;
        }
      }
    });
  };

  const isChecked = (pronouns, option) => {
    return (
      pronouns.includes(option.value) || pronouns.includes(option.nominative)
    );
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
        <span>
          {pronouns.length > 0 ? pronouns.join("/") : "Select pronouns"}
        </span>
        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="custom-select-dropdown">
          {options.map((option, index) => (
            <div key={index} className="custom-select-option">
              <input
                type="checkbox"
                id={`pronoun-${index}`}
                checked={isChecked(pronouns, option)}
                onChange={() => handleChange(option)}
              />
              <label htmlFor={`pronoun-${index}`}>{option.label}</label>
            </div>
          ))}
        </div>
      )}

      {isOpen && <div className="overlay" onClick={closeDropdown}></div>}
    </div>
  );
};
export default MultiSelect;
