import React from "react";
import { ButtonStyle } from "./style";
import { Link } from "react-router-dom";

const Button = ({ text, color, link }) => {
  const setColor = (color) => {
    switch (color) {
      case "main":
        return { text: "white", background: "#0A1139" };
    }
  };
  return (
    <ButtonStyle color={setColor(color)}>
      <Link to={link}>{text}</Link>
    </ButtonStyle>
  );
};

export default Button;
