import React, { useState } from "react";
import FunctionalInput from "../FunctionalInput/FunctionalInput";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const MuiInput = () => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-gender-select-label">Gender Identity</InputLabel>
      <Select
        labelId="demo-gender-select-label"
        id="demo-gender-select"
        label="Gender Identity"
        fullWidth
      ></Select>
    </FormControl>
  );
};

const Demo = () => {
  const [genderValue, setGenderValue] = useState("");
  

  const onGenderChange = (event) => {
    console.log(event.target.value);
    setGenderValue(event.target.value);
  };

  return (
    <>
      <FunctionalInput
        type="select"
        variant="gender"
        onChange={onGenderChange}
        value={genderValue}
        // inputProps={<MuiInput />}
        // label
        // placeholder
        helperText='Please select'
        // error='Please select an option'
        // disabled
      />
    </>
  );
};

export default Demo;
