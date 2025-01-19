import React, { useState } from "react";

const Practice = () => {
  const [h1Color, setH1Color] = useState("black");

  const colorChange = (event) => {
    const buttonText = event.target.innerText;
    const buttonColor = event.target.style.color;

    console.log(buttonText);
    console.log(buttonColor);
    console.log(h1Color);

    if (buttonText === "Yes") {
      setH1Color(buttonColor);
    } else if (buttonText === "No") {
      setH1Color(buttonColor);
    }
  };

  return (
    <>
      <h1 style={{ color: h1Color }}>Hi</h1>
      <button style={{ color: "red" }} onClick={colorChange}>
        Yes
      </button>
      <button style={{ color: "green" }} onClick={colorChange}>
        No
      </button>
    </>
  );
};

export default Practice;
