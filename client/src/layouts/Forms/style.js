import React from "react";
import styled from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const Form = styled.form`
  margin: 30px 80px;
  & > * {
    width: 100%;
    margin-bottom: 10px;
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

export const LabelStyle = styled.label`
  color: red;
`;

export const DogsContainer = styled.div`
  margin: 0;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export const RadioContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {children[0]}
        </Grid>
        <Grid item xs={2}>
          {children[1]}
        </Grid>
      </Grid>
    </div>
  );
};

export default Form;
