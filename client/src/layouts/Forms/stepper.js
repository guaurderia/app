import React, { useEffect } from "react";
import { connect } from "react-redux";
import { postData, setData } from "../../redux/actions";
import { useFormContext } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { StepperButtonContainer, SpinnerContainer } from "./style";
import { useFormDisplaySetter } from "./context";
import { DateTime } from "luxon";
import _ from "lodash";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import DogForm from "./DogForm";
import OwnerForm from "./OwnerForm";
import PassForm from "./PassForm";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    textAlign: "center",
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

const FormStepper = (props) => {
  const classes = useStyles();
  const { watch, reset } = useFormContext();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [formCompiler, setFormCompiler] = React.useState({});
  const [clientCreated, setClientCreated] = React.useState(false);
  const setIsOpen = useFormDisplaySetter();
  const steps = getSteps();
  const form = watch();

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
        handleSubmit({ ...formCompiler, pass: form });
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
    setFormCompiler({});
  };

  const handleSubmit = async (form) => {
    const dog = { ...form.dog, username: form.owner.username };
    const owner = { ...form.owner, roll: "owner", password: "1234", dogChip: dog.chip };
    const pass = { ...form.pass, purchased: DateTime.local(), passType: form.pass.passType._id, dogChip: dog.chip };
    const [newDogList, newUserList, newPassList] = Promise.all([props.createDog(dog), props.createOwner(owner), props.createPass(pass)]);
    const newDog = newDogList.filter((dog) => dog.chip === form.dog.chip);
    const newOwner = newUserList.filter((user) => user.username === form.owner.username);
    const updatedDog = { owner: newOwner._id };
    const updatedPass = { dog: newDog._id };
    await props.updateDog(updatedDog);
    await props.updatePass(updatedPass);
    setClientCreated(true);
    console.log("CLIENTE CREATED", clientCreated);
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
            {clientCreated ? (
              <>
                <Typography className={classes.instructions}>Registro completado</Typography>
                <Button onClick={handleReset} className={classes.button}>
                  Cerrar
                </Button>
              </>
            ) : (
              <SpinnerContainer>
                <CircularProgress />
              </SpinnerContainer>
            )}
          </div>
        ) : (
          <div>
            {getStepContent(activeStep, formCompiler)}
            <StepperButtonContainer>
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
            </StepperButtonContainer>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    newDog: state.dog.new,
    newOwner: state.user.new,
    newPass: state.pass.new,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createDog: (dog) => dispatch(postData("/dog/create", "dog", dog, "list")),
    createOwner: (owner) => dispatch(postData("/user/create", "user", owner, "list")),
    createPass: (pass) => dispatch(postData("/pass/create", "pass", pass, "list")),
    updateDog: (dog) => dispatch(postData(`/dog/update/?_id=${dog._id}`, "dog", dog, "list")),
    updatePass: (pass) => dispatch(postData(`/pass/update/?_id=${pass._id}`, "dog", pass, "list")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormStepper);
