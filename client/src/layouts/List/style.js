import styled from "styled-components";
import { Link } from "react-router-dom";

export const DogListContainer = styled.div`
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const LinkStyle = styled(Link)`
  &.active {
    background: #f7f7f7;
    color: black;
    border-color: #e5e5e5;
  }
`;
