import React, { useEffect, useState } from "react";
import SIYWPronouns from "../SayItYourWayInput/SIYWPronouns/SIYWPronouns";
import SIYWGenderId from "../SayItYourWayInput/SIYWGenderId/SIYWGenderId";

const FormDemo = () => {
  const [pronounsValue, setPronounsValue] = useState("");
  const [pronounError, setPronounError] = useState("");
  const [genderValue, setGenderValue] = useState("");

  const onGenderChange = (item) => {
    console.log("genderValue::", item);
    setGenderValue(item);
  };

  const onPronounsChange = (item) => {
    setPronounsValue(item);
  };

  useEffect(() => {
    setPronounError("");
  }, [pronounsValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!pronounsValue) {
      setPronounError("Please make a selection.");
      return;
    } else {
      setPronounError("");
    }
    console.log(pronounsValue);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "500px" }}>
      {/* Gender selection */}
      <SIYWGenderId
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
      <SIYWPronouns
        key="pronouns"
        onChange={onPronounsChange}
        value={pronounsValue}
        label="Preferred Pronouns"
        placeholder="Please select your preference..."
        helperText="This information is only used to ensure respectful and accurate communication."
        errorText={pronounError}
        // required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormDemo;
