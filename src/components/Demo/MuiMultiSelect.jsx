import React from 'react';
import { MenuItem, Select, FormControl, InputLabel, Checkbox, ListItemText } from '@mui/material';

const MuiMultiSelect = ({ value, onChange, options, disabled, label }) => {
  // Format the display value based on selected pronouns
  const formatPronounsForDisplay = (selectedPronouns) => {
    const selectedGroups = options.filter(option =>
      selectedPronouns.includes(option[0]) // Nominative is option[0]
    );

    // If only one group is selected, display both nominative and accusative
    if (selectedGroups.length === 1) {
      return selectedGroups[0].join("/"); // e.g., "he/him"
    }
    // If multiple groups are selected, display only nominative forms
    return selectedGroups.map(group => group[0]).join("/"); // e.g., "he/she"
  };

  const handleChange = (event) => {
    const selectedValues = event.target.value;

    // Check if more than one item is selected
    if (selectedValues.length > 1) {
      // Only keep the nominative forms (index 0) when multiple are selected
      const nominativeOnly = selectedValues.map(val => val.split("/")[0]);
      onChange(nominativeOnly); // Notify parent with nominative forms only
    } else {
      // If only one item is selected, pass the full nominative/accusative pair
      onChange([selectedValues[0].split("/")[0]]); // Notify parent with nominative/accusative
    }
  };

  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={formatPronounsForDisplay(value).split("/")} // Use formatted value for display
        onChange={handleChange}
        renderValue={() => formatPronounsForDisplay(value)} // Display formatted pronouns
      >
        {options.map((option) => (
          <MenuItem key={option[0]} value={option.join("/")}>
            <Checkbox checked={value.includes(option[0])} />
            <ListItemText primary={option.join("/")} /> {/* "he/him", "she/her" */}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MuiMultiSelect;
