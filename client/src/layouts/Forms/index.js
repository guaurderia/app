import React, { useState } from "react";
import DogForm from "./DogForm";
import OwnerForm from "./OwnerForm";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popover from "@material-ui/core/Popover";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const usePopoverStyles = makeStyles({
  paper: {
    display: "flex",
    "& > *": {
      margin: 20,
      width: 700,
    },
  },
});

const FormLayout = withRouter(({ history }) => {
  const [open, setOpen] = useState(true);
  const classes = usePopoverStyles();

  const handleClose = () => {
    setOpen(false);
    history.push("/dogs");
  };

  const popOverProps = {
    open: open,
    anchorReference: "anchorPosition",
    anchorPosition: { top: 200, left: 400 },
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
    className: classes.paper,
  };

  return (
    <Popover {...popOverProps}>
      <DogForm />
    </Popover>
  );
});

export default FormLayout;
