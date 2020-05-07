import React, { forwardRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import FormStepper from "./stepper";
import { useForm, FormContext } from "react-hook-form";
import { useFormDisplay, useFormAnchor, useFormDisplaySetter } from "./context";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormLayout = withRouter(({ history }) => {
  const methods = useForm({ mode: "onBlur" });
  const isOpen = useFormDisplay();
  const setIsOpen = useFormDisplaySetter();

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog fullScreen open={isOpen} onClose={handleClose} TransitionComponent={Transition}>
      <FormContext {...methods}>
        <FormStepper />
      </FormContext>
    </Dialog>
  );
});

export default FormLayout;
