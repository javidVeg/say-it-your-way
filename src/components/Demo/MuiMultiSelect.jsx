import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MuiMultiSelect = ({ value, onChange, options, label }) => {
  const [pronouns, setPronouns] = React.useState([]);

  const handleChange = (event, option) => {
    const { value } = option;

    setPronouns((prevPronouns) => {
      const alreadySelected =
        prevPronouns.includes(value) ||
        prevPronouns.includes(option.nominative);

      if (alreadySelected) {
        // if it's already selected, remove it
        const newPronouns = prevPronouns.filter(
          (pronoun) => pronoun !== value && pronoun !== option.nominative
        );

        // if only one pronoun is left, re-add the part after the '/'
        if (newPronouns.length === 1) {
          const firstPronounValue = options.find(
            (option) =>
              option.nominative === newPronouns[0] ||
              option.value === newPronouns[0]
          )?.value; // Find the full value of the remaining item
          return [firstPronounValue];
        }

        return newPronouns;
      } else {
        // if not selected, add it
        if (prevPronouns.length === 0) {
          return [value]; // first selection keeps the full value
        } else {
          const firstPronounWithoutSlash = prevPronouns[0].split("/")[0];

          // when adding additional selections, remove part after '/' for the first value
          const updatedPronouns = [
            firstPronounWithoutSlash,
            ...prevPronouns.slice(1), // keep the remaining previous selections
            value.split("/")[0], // add new selection without part after '/'
          ];

          return updatedPronouns;
        }
      }
    });
  };

  const isChecked = (pronouns, option) => {
    return (
      pronouns.includes(option.value) || pronouns.includes(option.nominative)
    );
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-multiple-checkbox-label">
        Preferred Pronouns
      </InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        fullWidth
        value={pronouns}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join("/")}
        MenuProps={MenuProps}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            value={option.value}
            onClick={() => handleChange(null, option)}
          >
            <Checkbox checked={isChecked(pronouns, option)} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MuiMultiSelect;
