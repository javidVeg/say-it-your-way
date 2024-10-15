import React, { useMemo, useState } from "react";
import "./styles.css";
import { genderIdentities } from "../../data/identity";
import SelectInput from "./components/SelectInput";

const SayItYourWayGenderId = ({
  onChange,
  inputComponent: InputComponent,
  label,
  placeholder = "Please select...",
  helperText,
  error,
  disabled,
  value = "",
  customOptions,
}) => {

  const [finalOptions, setFinalOptions] = useState(() => {
    return customOptions ? customOptions : [...genderIdentities];
  });

  useMemo(() => {
    const valueExists = finalOptions.some(option => option.value === value);
    if (value && !valueExists) {
      setFinalOptions(prevOptions => [...prevOptions, { label: value, value: value }]);
    }
  }, [value, finalOptions]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = finalOptions.find(option => option.value === selectedValue);
    onChange(selectedOption.value); 
  };

  return (
    <div className={`input-container ${disabled ? "disabled" : ""}`}>
      {InputComponent ? (
        <InputComponent
          value={value || ""}
          onChange={handleSelectChange}
          disabled={disabled}
          options={finalOptions}
          placeholder={placeholder}
          label={label}
        />
      ) : (
        <SelectInput
          value={value || ""}
          onChange={handleSelectChange}
          disabled={disabled}
          options={finalOptions}
          placeholder={placeholder}
          label={label}
        />
      )}
      {!error && helperText && <p className="helper-text">{helperText}</p>}
      {error && <p className="error-text">Error: {error}</p>}
    </div>
  );
};

export default SayItYourWayGenderId;