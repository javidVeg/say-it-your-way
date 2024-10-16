import React, { useState } from "react";
import SayItYourWayGenderId from "../SayItYourWayInput/SayItYourWayGenderId";
import SayItYourWayPronouns from "../SayItYourWayInput/SayItYourWayPronouns";
import "./demo-styles.css";
import MuiSelect from "./MuiSelect";
import MuiMultiSelect from "./MuiMultiSelect";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Demo = () => {
  const [genderValue, setGenderValue] = useState("");
  const [pronounsValue, setPronounsValue] = useState("");

  const onGenderChange = (item) => {
    console.log("genderValue::", item);
    setGenderValue(item);
  };
  const onPronounsChange = (item) => {
    console.log("pronounsValue::", item);
    setPronounsValue(item);
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
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

      {/* Pronoun selection w/ custom component */}
      <SayItYourWayPronouns
        key="pronouns-custom"
        selectionType="multi-select"
        onChange={onPronounsChange}
        value={pronounsValue}
        label="Preferred Pronouns"
        placeholder="Preferred Pronouns"
        helperText="Please select your preferred pronouns."
        customOptions={false}
        // error='Please select an option'
        // disabled
      />

<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>
    </div>
  );
};

export default Demo;
