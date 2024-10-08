import React from "react";

const SelectInput = (props) => {
  const { value, onChange, options, placeholder, disabled } = props;
  return (
    <select
      className={`select ${disabled ? "disabled" : ""}`}
      value={value?.value || ""}
      onChange={onChange}
      disabled={disabled}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
