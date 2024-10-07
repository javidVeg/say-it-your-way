import React from "react";
import "./styles.css";
import { genderIdentities } from "../../data/identity";
import { pronouns } from "../../data/pronouns";

const FunctionalInput = (props) => {
  const {
    onChange,
    inputProps,
    variant,
    label,
    placeholder,
    helperText,
    error,
    disabled,
    type,
    value = "",
  } = props;

  let options = [];

  switch (variant) {
    case "gender":
      options = genderIdentities;
      break;
    case "pronouns":
      options = pronouns;
      break;
    default:
      console.error("Invalid variant, please provide a valid variant");
  }

  console.log(options);

  return (
    <div className="main-container">
      {type === "select" ? (
        <select value={value} onChange={onChange} disabled={disabled}>
          {options &&
            options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      ) : (
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
      {helperText && <p className="helper-text">{helperText}</p>}
      {error && <p className="error-text">Error: {error}</p>}
    </div>
  );
};

export default FunctionalInput;
