import React from "react";

const SelectInput = (props) => {
  const {
    value,
    onChange,
    options,
    label,
    placeholder,
    disabled,
    className,
    style,
    renderOption,
    placeholderProps,
    optionProps,
    onFocus,
    onBlur,
    required,
  } = props;

  return (
    <div>
      {label && <label>{label}</label>}
      <select
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        className={`siyw-select${disabled ? "-disabled" : ""} ${className} `}
        style={style}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
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
    </div>
  );
};

export default SelectInput;
