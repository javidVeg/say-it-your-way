import React, { useState } from "react";
import SayItYourWayInput from "../SayItYourWayInput/SayItYourWayInput";
import "./demo-styles.css";
import MuiSelect from "./MuiSelect"
import MuiMultiSelect from "./MuiMultiSelect"


const Demo = () => {
  const [genderValue, setGenderValue] = useState("");

  const onGenderChange = (item) => {
    console.log(item);
    setGenderValue(item);
  };

  return (
    <div className="main-container">
      <SayItYourWayInput
        type="multi-select"
        // type="select"
        // variant="gender"
        variant="pronouns"
        onChange={onGenderChange}
        value={genderValue}
        // inputComponent={MuiMultiSelect}
        label='Gender Identity'
        placeholder='Gender Identity'
        helperText="Please select your gender identity"
        // error='Please select an option'
        // disabled
      />
    </div>
  );
};

export default Demo;
