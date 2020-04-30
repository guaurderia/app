import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DogForm from "./DogForm";
import OwnerForm from "./OwnerForm";
import { withRouter } from "react-router-dom";
import { setData } from "../../redux/actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Mascota", "Dueño", "Bono"];
}

function getStepContent(step, content) {
  switch (step) {
    case 0:
      return <DogForm {...{ content }} />;
    case 1:
      return <OwnerForm {...{ content }} />;
    case 2:
      return "PassForm";
    default:
      return "Unknown step";
  }
}

const FormStepper = withRouter(({ history, setForm }) => {
  const classes = useStyles();
  const { watch, reset } = useFormContext();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [formCompiler, setFormCompiler] = React.useState({});
  const steps = getSteps();
  const form = watch();

  console.log("FORM COMPILER", formCompiler, activeStep);
  const isStepOptional = (step) => {
    return step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    switch (activeStep) {
      case 0:
        setFormCompiler({ dog: form });
        reset({});
        history.replace("/dogs/create/owner");
        break;
      case 1:
        setFormCompiler({ ...formCompiler, owner: form });
        reset({});
        history.replace("/dogs/create/pass");
        break;
      case 2:
        setFormCompiler({ ...formCompiler, pass: form });
        reset({});
        history.replace("/dogs");
        break;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    switch (activeStep) {
      case 1:
        reset({ ...formCompiler.dog });
        history.replace("/dogs/create/dog");
        break;
      case 2:
        reset({ ...formCompiler.owner });
        history.replace("/dogs/create/owner");
    }
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>Registro completado</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep, form)}
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Volver
              </Button>
              {isStepOptional(activeStep) && (
                <Button variant="contained" color="primary" onClick={handleSkip} className={classes.button}>
                  Saltar
                </Button>
              )}

              <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default FormStepper;
