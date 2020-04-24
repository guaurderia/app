import styled from "styled-components";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

export const DogItemContentGrid = styled.div`
  color: #6d6d6d;
  display: flex;
`;

export const DogName = styled.div`
  color: black;
  font-size: 18px;
  width: 100px;
  margin-right: 30px;
`;

export const DogBreedDisplay = styled.div`
  font-size: 14px;
  font-style: italic;
  margin: 0 10px;
  width: 100px;
`;

export const PassContainer = styled.div`
  width: 300px;
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

export const PassElement = styled.div`
  height: 30px;
  padding: 2px 10px;
  &.selected {
    background: #ddd;
    color: black;
  }
`;

export const AttendanceButton = styled.div`
  > button {
    width: 80px;
    height: 30px;
    margin: 0 20px;
  }
`;

export const TimeContainer = styled.div`
  margin: 10px;
`;

export const OwnerName = styled.div`
  font-size: 14px;
  color: #6d6d6d;
`;
