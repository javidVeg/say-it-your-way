import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const MuiSelect = ({ value, onChange, options, label }) => {
    return (
      <FormControl fullWidth>
        <InputLabel id="demo-gender-select-label">
          {label || "Gender Identity"}
        </InputLabel>
        <Select
          labelId="demo-gender-select-label"
          id="demo-gender-select"
          label={label || "Gender Identity"}
          value={value || ""}
          onChange={onChange}
          fullWidth
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

export default MuiSelect;

