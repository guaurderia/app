import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

export const DogsContainer = styled.div`
  margin-top: 70px;
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

export const GridContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          {children[0]}
          {children[1]}
        </Grid>
        <Grid item xs={10}>
          {children[2]}
        </Grid>
      </Grid>
    </div>
  );
};
