import React, { useState, createRef, useEffect } from "react";
import Popover from "@material-ui/core/Popover";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import FormStepper from "./stepper";
import { useForm, FormContext } from "react-hook-form";
import { useFormDisplay, useFormAnchor, useFormDisplaySetter } from "./context";

const usePopoverStyles = makeStyles({
  paper: {
    display: "flex",
    "& > *": {
      width: 500,
    },
  },
});

const FormLayout = withRouter(({ history }) => {
  const methods = useForm();
  const formClasses = usePopoverStyles();
  const isOpen = useFormDisplay();
  const setIsOpen = useFormDisplaySetter();
  const anchorEl = useFormAnchor();
  const { reset } = methods;

  const handleClose = () => {
    setIsOpen(false);
  };

  const popOverProps = {
    open: isOpen,
    anchorEl,
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

  return (
    <Popover {...popOverProps}>
      <FormContext {...methods}>
        <FormStepper />
      </FormContext>
    </Popover>
  );
});

export default FormLayout;
