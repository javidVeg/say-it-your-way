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

const Demo = () => {
  const [genderValue, setGenderValue] = useState("");
  const [pronounsValue, setPronounsValue] = useState("");

  const onGenderChange = (item) => {
    console.log("genderValue::", item);
    setGenderValue(item);
  };
  const onPronounsChange = (item) => {
    setPronounsValue(item);
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
        placeholder="Please select your preference..."
        helperText="This information is only used to ensure respectful and accurate communication."
        customOptions={false}
        variant="outlined"
        arrowUp={null}
        arrowDown={null}
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
    </div>
  );
};

export default Demo;
