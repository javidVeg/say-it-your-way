import React, { useEffect, useState } from "react";
import SIYWPronouns from "../SayItYourWayInput/SIYWPronouns/SIYWPronouns";
import SIYWGenderId from "../SayItYourWayInput/SIYWGenderId/SIYWGenderId";

const FormDemo = () => {
  const [pronounsValue, setPronounsValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [pronounError, setPronounError] = useState("");
  const [genderError, setGenderError] = useState("");

  const onGenderChange = (item) => {
    console.log("genderValue::", item);
    setGenderValue(item);
  };

  const onPronounsChange = (item) => {
    setPronounsValue(item);
  };

  useEffect(() => {
    setPronounError("");
    setGenderError("");
  }, [pronounsValue, genderValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!pronounsValue) {
      setPronounError("Please make a selection.");
      return;
    } else {
      setPronounError("");
    }

    if (!genderValue) {
      setGenderError("Please make a selection.");
      return;
    } else {
      setGenderError("");
    }

    console.log(pronounsValue);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "500px" }}>
      {/* Gender selection */}
      <SIYWGenderId
        key="gender"
        selectionType="select"
        // label="Gender Identity"
        onChange={onGenderChange}
        value={genderValue}
        // helperText="This information is only used to ensure respectful and accurate communication."
        customOptions={false}
        required
        errorText={genderError}
        // error='Please select an option'
        disabled
      />
      <SIYWPronouns
        key="pronouns"
        onChange={onPronounsChange}
        value={pronounsValue}
        // label="Preferred Pronouns"
        // helperText="This information is only used to ensure respectful and accurate communication."
        errorText={pronounError}
        required
        disabled
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormDemo;
