import React, { useMemo, useCallback } from "react";
import "./styles.css";
import { genderIdentities } from "../../data/identity";
import { pronouns } from "../../data/pronouns";
import SelectInput from "./components/SelectInput";
import MultiSelect from "./components/MultiSelect"

// SayItYourWayInput component onChange returns the selected option object instead of the event object.
const SayItYourWayPronouns = ({
  onChange,
  inputComponent: InputComponent,
  variant,
  label,
  placeholder = "Please select...",
  helperText,
  error,
  disabled,
  selectionType,
  value = "",
}) => {

  
  const options = useMemo(() => {
    switch (variant) {
      case "gender":
        return genderIdentities;
      case "pronouns":
        return pronouns;
      default:
        console.error("Invalid variant, please provide a valid variant");
        return [];
    }
  }, [variant]);

  const handleSelectChange = useCallback(
    (event) => {
      const selectedOption = options.find(
        (option) => option.value === event.target.value
      );
      onChange(selectedOption.value);
    },
    [onChange, options]
  );

  return (
    <div className={`input-container ${disabled ? "disabled" : ""}`}>
      {InputComponent ? (
        <InputComponent
          value={value || ""}
          onChange={handleSelectChange}
          disabled={disabled}
          options={options}
        />
      ) : selectionType === "select" ? (
        <SelectInput
          value={value || ""}
          onChange={handleSelectChange}
          disabled={disabled}
          options={options}
          placeholder={placeholder}
        />
      ) : (
        <MultiSelect
          className={disabled ? "disabled" : ""}
          value={value}
          onChange={onChange}
          placeholder={!value ? placeholder : undefined}
          disabled={disabled}
          options={options}
        />
      )}
      {!error && helperText && <p className="helper-text">{helperText}</p>}
      {error && <p className="error-text">Error: {error}</p>}
    </div>
  );
};

export default SayItYourWayPronouns;
