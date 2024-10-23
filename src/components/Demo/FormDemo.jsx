import React, { useEffect, useState } from "react";
import SayItYourWayPronouns from "../SayItYourWayInput/SayItYourWayPronouns";

const FormDemo = () => {
  const [pronounsValue, setPronounsValue] = useState("");
  const [pronounError, setPronounError] = useState("");

  const onPronounsChange = (item) => {
    setPronounsValue(item);
  };

  useEffect(() => {
    setPronounError("");
  }, [pronounsValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!pronounsValue) {
      setPronounError("Please make a selection");
      return;
    } else {
      setPronounError("");
    }
    console.log(pronounsValue);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "500px" }}>
      <SayItYourWayPronouns
        key="pronouns"
        onChange={onPronounsChange}
        value={pronounsValue}
        label="Preferred Pronouns"
        placeholder="Please select your preference..."
        helperText="This information is only used to ensure respectful and accurate communication."
        error={pronounError}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormDemo;
