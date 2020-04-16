import styled from "styled-components";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

export const DogItemContentGrid = styled(Grid)`
  color: red;
`;

export const ItemStyle = styled(Link)`
  &.active {
    background: #f7f7f7;
    color: black;
    border-color: #e5e5e5;
  }
  &.active-attendance {
    background: rgb(120, 200, 0, 0.2);
  }
  &.ended-attendance {
    background: rgb(255, 233, 0, 0.2);
  }
`;
