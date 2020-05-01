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
import { useFormDisplaySetter } from "./context";
import PassForm from "./PassForm";

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

function getStepContent(step, formContent) {
  switch (step) {
    case 0:
      return <DogForm {...{ formContent }} />;
    case 1:
      return <OwnerForm {...{ formContent }} />;
    case 2:
      return <PassForm {...{ formContent }} />;
    default:
      return "Unknown step";
  }
}

const FormStepper = () => {
  const classes = useStyles();
  const { watch, reset } = useFormContext();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [formCompiler, setFormCompiler] = React.useState({});
  const setIsOpen = useFormDisplaySetter();
  const steps = getSteps();
  const form = watch();

  console.log("FORM COMPILER", formCompiler);

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
        setFormCompiler({ ...formCompiler, dog: form });
        break;
      case 1:
        setFormCompiler({ ...formCompiler, owner: form });
        break;
      case 2:
        setFormCompiler({ ...formCompiler, pass: form });
        break;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      switch (activeStep) {
        case 1:
          setFormCompiler({ ...formCompiler, owner: form });
          break;
        case 2:
          setFormCompiler({ ...formCompiler, pass: form });
          break;
      }
    } else setIsOpen(false);
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
            {getStepContent(activeStep, formCompiler)}
            <div>
              <Button onClick={handleBack} className={classes.button}>
                Volver
              </Button>
              {isStepOptional(activeStep) && (
                <Button variant="contained" color="primary" onClick={handleSkip} className={classes.button}>
                  Saltar
                </Button>
              )}
              <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormStepper;
