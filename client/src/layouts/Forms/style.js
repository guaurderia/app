import styled from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";

const Form = styled.form`
  margin: 30px 80px;
  & > * {
    width: 100%;
    margin-bottom: 5px;
  }
`;

export const FormTheme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      root: {
        color: "black",
        marginTop: "20px",
        marginBottom: "5px",
      },
    },
    MuiFormControlLabel: {
      labelPlacementStart: {
        justifyContent: "flex-end",
        marginLeft: "0px",
      },
    },
  },
});

export const inputStyle = {
  variant: "outlined",
  margin: "dense",
  size: "small",
  fullWidth: true,
};

export const selectedStyle = {
  variant: "contained",
  color: "primary",
};

export default Form;
