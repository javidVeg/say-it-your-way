import React, { useState } from "react";
import SayItYourWayGenderId from "../SayItYourWayInput/SayItYourWayGenderId";
import SayItYourWayPronouns from "../SayItYourWayInput/SayItYourWayPronouns";
import "./demo-styles.css";
import MuiSelect from "./MuiSelect";
import MuiMultiSelect from "./MuiMultiSelect";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

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

const Demo = () => {
  const [genderValue, setGenderValue] = useState("");
  const [pronounsValue, setPronounsValue] = useState('she/they');

  const onGenderChange = (item) => {
    console.log("genderValue::", item);
    setGenderValue(item);
  };
  const onPronounsChange = (item) => {
    console.log("pronounsValue::", item);
    setPronounsValue(item);
  };

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className="main-container">
      {/* Gender selection */}
      {/* <SayItYourWayGenderId
        key="gender"
        selectionType="select"
        onChange={onGenderChange}
        value={genderValue}
        label="Gender Identity"
        placeholder="Gender Identity"
        helperText="Please select your gender identity."
        customOptions={false}
        // error='Please select an option'
        // disabled
      /> */}

      {/* Gender selection w/ custom component */}
      {/* <SayItYourWayGenderId
        key="gender-custom"
        selectionType="select"
        onChange={onGenderChange}
        value={genderValue}
        label="Gender Identity"
        placeholder="Gender Identity"
        helperText="Please select your gender identity."
        customOptions={false}
        inputComponent={MuiSelect}
        // error='Please select an option'
        // disabled
      /> */}

      {/* Pronoun selection */}
      <SayItYourWayPronouns
        key="pronouns"
        selectionType="multi-select"
        onChange={onPronounsChange}
        value={pronounsValue}
        label="Preferred Pronouns"
        placeholder="Preferred Pronouns"
        helperText="Please select your preferred pronouns."
        customOptions={false}
        variant="outlined"
        // customStyles={{
        //     container: {
        //       marginBottom: "1.5rem",
        //     },
        //     input: {
        //       border: "2px solid #1976d2",
        //       borderRadius: "8px",
        //       padding: "0.75rem",
        //     },
        //     dropdown: {
        //       borderRadius: "8px",
        //       backgroundColor: "#f9f9f9",
        //     },
        //     option: {
        //       padding: "10px",
        //     },
        //   }}
        // error='Please select an option'
        // disabled
      />

      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.includes(name)} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Demo;
