import styled from "styled-components";

export const ButtonStyle = styled.button`
  background: ${(props) => props.color.background};
  color: ${(props) => props.color.text};
  padding: 8px 15px;
`;
