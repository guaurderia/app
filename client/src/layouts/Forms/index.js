import React from "react";
import Popover from "@material-ui/core/Popover";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import FormStepper from "./stepper";
import { useForm, FormContext } from "react-hook-form";
import { useFormDisplay, useFormAnchor, useFormDisplaySetter } from "./context";

const useStyles = makeStyles((theme) => ({
  backdropStyle: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  formStyle: {
    display: "flex",
    "& > *": {
      width: 500,
    },
  },
}));

const FormLayout = withRouter(({ history }) => {
  const methods = useForm({ mode: "onBlur" });
  const { backdropStyle, formStyle } = useStyles();
  const isOpen = useFormDisplay();
  const setIsOpen = useFormDisplaySetter();
  const anchorEl = useFormAnchor();
  const { watch, errors } = methods;
  const form = watch();

  console.log(backdropStyle, formStyle);

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
    className: formStyle,
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
