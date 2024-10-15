import React, { useState } from "react";

const SelectInput = (props) => {
    const { value, onChange, options, placeholder, disabled } = props;
    const [originalValue] = useState(value);

    const valueExists = options.some(option => option.value === originalValue);
    
    return (
      <select
        className={`select ${disabled ? "disabled" : ""}`}
        value={value || ""}
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
        
        {!valueExists && originalValue && (
          <option value={originalValue}>{originalValue}</option>
        )}
      </select>
    );
  };

export default SelectInput;
