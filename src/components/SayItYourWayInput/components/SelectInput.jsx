import React, { useState } from "react";

const SelectInput = (props) => {
  const {
    value,
    onChange,
    options,
    placeholder = "Select an option",
    disabled = false,
    className = "",
    style = {},
    renderOption,
    placeholderProps = {},
    optionProps = {},
    onFocus,
    onBlur,
  } = props;

  return (
    <select
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className={`siyw-select ${className}`}
      style={style}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <option value="" disabled {...placeholderProps}>
        {placeholder}
      </option>

      {options.map((option, index) => (
        <option key={index} value={option.value} {...optionProps}>
          {renderOption ? renderOption(option) : option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
