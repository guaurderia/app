import React from "react";
import logoIcon from "../../public/img/logo-icon.png";
import logoFull from "../../public/img/logo-full.jpg";
import styled from "styled-components";

const Logo = ({ type, size }) => {
  if (type === "icon") {
    return <LogoStyle src={logoIcon} {...{ size }} />;
  }
  if (type === "full") {
    return <LogoStyle src={logoFull} {...{ size }} />;
  }
};

const LogoStyle = styled.img`
  width: ${(props) => props.size};
`;

export default Logo;
