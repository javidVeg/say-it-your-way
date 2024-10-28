import React, { useMemo, useState } from "react";
import "./siyw-gender-styles.css";
import { genderIdentities } from "../../../data/identity";
import SelectInput from "../components/SelectInput";


/**
 * SIYWGenderId is a customizable component that provides a dropdown menu to select gender identities.
 * It includes a default set of gender identities and allows users to add custom options.
 * Additional UI features include a placeholder, helper text, error messaging, and customizable styling.
 *
 * @component
 * @param {object} props - The props object for the SIYWGenderId component.
 * @param {function} props.onChange - Callback function triggered when the selected option changes. Receives the selected option's `value`.
 * @param {string} [props.label] - Label text displayed above the select input.
 * @param {string} [props.placeholder="Please select..."] - Placeholder text displayed when no option is selected.
 * @param {string} [props.helperText] - Additional text displayed below the select input to assist the user.
 * @param {string} [props.error] - Error message text displayed below the select input if an error occurs.
 * @param {boolean} [props.disabled=false] - Disables the select input when set to true.
 * @param {string} [props.value=""] - The currently selected value in the dropdown.
 * @param {Array<{ label: string, value: string }>} [props.customOptions] - Array of custom options to extend or override the default gender identities.
 * @param {string} [props.className=""] - Additional CSS class name(s) to style the select container.
 * @param {object} [props.style={}] - Inline styles for the select container.
 * @param {function} [props.renderOption] - Optional custom render function for each option. Receives an option object as an argument and should return JSX.
 * @param {object} [props.placeholderProps={}] - Additional props for the placeholder option element, such as `style` or `className`.
 * @param {object} [props.optionProps={}] - Additional props for each option element, such as `style` or `className`.
 * @param {function} [props.onFocus] - Callback function triggered on focus event.
 * @param {function} [props.onBlur] - Callback function triggered on blur event.
 *
 * @returns {JSX.Element} Rendered SIYWGenderId component with custom options and select input.
 *
 * @example
 * // Basic usage with default gender identities
 * <SIYWGenderId
 *   value="non-binary"
 *   onChange={(selectedValue) => console.log(selectedValue)}
 *   placeholder="Choose your gender identity"
 * />
 *
 * @example
 * // Usage with custom gender options
 * const customGenderOptions = [
 *   { label: 'Agender', value: 'agender' },
 *   { label: 'Bigender', value: 'bigender' },
 * ];
 *
 * <SIYWGenderId
 *   value=""
 *   customOptions={customGenderOptions}
 *   onChange={(selectedValue) => console.log(selectedValue)}
 * />
 */
const SIYWGenderId = (props) => {
  const {
    onChange,
    label,
    placeholder = "Please select...",
    helperText,
    error,
    disabled,
    value = "",
    customOptions,
    className = "",
    style = {},
    renderOption,
    placeholderProps = {},
    optionProps = {},
    onFocus,
    onBlur,
  } = props;

  const [finalOptions, setFinalOptions] = useState(() => {
    return customOptions ? customOptions : [...genderIdentities];
  });

  useMemo(() => {
    const valueExists = finalOptions.some((option) => option.value === value);
    if (value && !valueExists) {
      setFinalOptions((prevOptions) => [
        ...prevOptions,
        { label: value, value: value },
      ]);
    }
  }, [value, finalOptions]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = finalOptions.find(
      (option) => option.value === selectedValue
    );
    onChange(selectedOption.value);
  };

  return (
    <>
      <SelectInput
        value={value || ""}
        onChange={handleSelectChange}
        disabled={disabled}
        options={finalOptions}
        placeholder={placeholder}
        label={label}
        className={className}
        style={style}
        renderOption={renderOption}
        placeholderProps={placeholderProps}
        optionProps={optionProps}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {!error && helperText && <p className="siyw-helper-text">{helperText}</p>}
      {error && <p className="siyw-error-text">Error: {error}</p>}
    </>
  );
};

export default SIYWGenderId;