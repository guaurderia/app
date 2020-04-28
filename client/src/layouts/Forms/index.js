import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Popover from "@material-ui/core/Popover";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import FormStepper from "./stepper";
import { useForm, FormContext } from "react-hook-form";

const usePopoverStyles = makeStyles({
  paper: {
    display: "flex",
    "& > *": {
      width: 700,
    },
  },
});

const useBackgroundStyles = makeStyles({
  root: {
    background: "black",
    width: "100vw",
    height: "100vh",
    position: "absolute",
  },
});

const FormLayout = withRouter(({ history }) => {
  const methods = useForm();
  const form = methods.watch();
  const [open, setOpen] = useState(true);
  const formClasses = usePopoverStyles();
  const backgroundClasses = useBackgroundStyles();

  const handleClose = () => {
    setOpen(false);
    history.push("/dogs");
  };

  const popOverProps = {
    open: open,
    anchorOrigin: {
      vertical: "center",
      horizontal: "center",
    },
    transformOrigin: {
      vertical: "center",
      horizontal: "center",
    },
    onClose: handleClose,
    transitionDuration: 100,
    classes: formClasses,
  };

  const backgroundProps = {
    classes: backgroundClasses,
  };

  return (
    <Paper {...backgroundProps}>
      <Popover {...popOverProps}>
        <FormContext {...methods}>
          <FormStepper />
        </FormContext>
      </Popover>
    </Paper>
  );
});

export default FormLayout;
