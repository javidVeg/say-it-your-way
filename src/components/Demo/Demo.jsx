import React, { useState } from "react";
import SayItYourWayGenderId from "../SayItYourWayInput/SayItYourWayGenderId";
import SayItYourWayPronouns from "../SayItYourWayInput/SayItYourWayPronouns";
import "./demo-styles.css";
import MuiSelect from "./MuiSelect";
import MuiMultiSelect from "./MuiMultiSelect";

const Demo = () => {
  const [genderValue, setGenderValue] = useState("");
  const [pronounsValue, setPronounsValue] = useState("they/them");

  const onGenderChange = (item) => {
    console.log("genderValue::", item);
    setGenderValue(item);
  };
  const onPronounsChange = (item) => {
    console.log("pronounsValue::", item);
    setPronounsValue(item);
  };

  return (
    <div className="main-container">
      {/* Gender selection */}
      <SayItYourWayGenderId
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
      />

      {/* Gender selection w/ custom component */}
      <SayItYourWayGenderId
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
      />

      {/* Pronoun selection */}
      {/* <SayItYourWayPronouns
        key="pronouns"
        selectionType="multi-select"
        onChange={onPronounsChange}
        value={pronounsValue}
        label="Preferred Pronouns"
        placeholder="Preferred Pronouns"
        helperText="Please select your preferred pronouns."
        customOptions={false}
        // error='Please select an option'
        // disabled
      /> */}

      {/* Pronoun selection w/ custom component */}
      {/* <SayItYourWayPronouns
        key="pronouns-custom"
        selectionType="multi-select"
        onChange={onPronounsChange}
        value={pronounsValue}
        label="Preferred Pronouns"
        placeholder="Preferred Pronouns"
        helperText="Please select your preferred pronouns."
        customOptions={false}
        inputComponent={MuiMultiSelect}
        // error='Please select an option'
        // disabled
      /> */}
    </div>
  );
};

export default Demo;
