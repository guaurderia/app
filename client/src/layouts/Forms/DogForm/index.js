import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { ThemeProvider } from "@material-ui/core/styles";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import ListItemText from "@material-ui/core/ListItemText";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { postData } from "../../../redux/actions";
import Form, { FormTheme } from "../style";
import { character, vaccines } from "../data";
import { breedSelector } from "../../../services/Format/Dog";
import LuxonUtils from "@date-io/luxon";
import { DateTime } from "luxon";
import { withRouter } from "react-router-dom";
import { translate } from "../../../services/Language";

const DogForm = withRouter(({ history, postDogCreate, breedList, language }) => {
  const { handleSubmit, watch, control, setValue, reset } = useForm();
  const form = watch();
  const perroa = form.gender === "male" ? "perro" : form.gender === "female" ? "perra" : "perr@";
  const castradoa = form.gender === "male" ? "castrado" : form.gender === "female" ? "castrada" : "castrad@";
  const vacunadoa = form.gender === "male" ? "vacunado" : form.gender === "female" ? "vacunada" : "vacunad@";

  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
      },
    },
  };

  console.log("FORM", form);
  const handleGender = (gender) => (form.gender === gender ? "contained" : "");
  const handleToggle = (state) => (state ? "contained" : "");

  const onSubmit = (obj) => {
    console.log(obj);
    obj.breed = obj.breed.value;
    obj.character = obj.character.value;
    postDogCreate(obj).then((res) => history.push("/dogs"));
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ThemeProvider theme={FormTheme}>
        <FormLabel component="legend">¿Es macho o hembra?</FormLabel>
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Controller as={Button} variant={handleGender("male")} name="gender" control={control} onClick={() => setValue("gender", "male")}>
            Macho
          </Controller>
          <Controller as={Button} variant={handleGender("female")} name="gender" control={control} onClick={() => setValue("gender", "female")}>
            Hembra
          </Controller>
        </ButtonGroup>
        <FormLabel component="legend">¿Como se llama tu {perroa}?</FormLabel>
        <Controller as={TextField} control={control} name="name" variant="outlined" defaultValue="" />
        <FormLabel component="legend" color="secondary">
          ¿Que raza es?
        </FormLabel>
        <Controller
          as={
            <Select>
              {breedSelector(breedList).map((breed) => {
                return (
                  <MenuItem key={breed.value[1]} value={breed.value[0]}>
                    {breed.label}
                  </MenuItem>
                );
              })}
            </Select>
          }
          name="breed"
          rules={{ required: true }}
          control={control}
          defaultValue=""
          variant="outlined"
        />
        <FormLabel component="legend">¿Cual es el su numero de chip?</FormLabel>
        <Controller as={TextField} control={control} name="chip" variant="outlined" defaultValue="" />
        <FormLabel component="legend">¿Está {castradoa}?</FormLabel>
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Controller as={Button} variant={handleToggle(form.fixed)} name="fixed" control={control} onClick={() => setValue("fixed", true)} defaultValue={false}>
            Si
          </Controller>
          <Controller as={Button} variant={handleToggle(!form.fixed)} name="fixed" control={control} onClick={() => setValue("fixed", false)} defaultValue={false}>
            No
          </Controller>
        </ButtonGroup>
        {!form.fixed && form.gender === "female" && (
          <>
            <FormLabel component="legend">¿Ha tenido su primer celo?</FormLabel>
            <ButtonGroup size="small" aria-label="small outlined button group">
              <Controller as={Button} variant={handleToggle(form.heat?.had)} name="heat" control={control} onClick={() => setValue("heat", { ...form.heat, had: true })} defaultValue={{ ...form.heat, had: false }}>
                Si
              </Controller>
              <Controller as={Button} variant={handleToggle(!form.heat?.had)} name="heat" control={control} onClick={() => setValue("heat", { ...form.heat, had: false })} defaultValue={{ ...form.heat, had: false }}>
                No
              </Controller>
            </ButtonGroup>
            {form.heat?.had && (
              <>
                <FormLabel component="legend">¿Cuando fué su último celo?</FormLabel>
                <Controller
                  as={
                    <MuiPickersUtilsProvider utils={LuxonUtils}>
                      <KeyboardDatePicker
                        autoOk
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        onChange={(date, string) => setValue("heat", { ...form.heat, date: string })}
                        value={form.heat?.date || DateTime.local()}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  }
                  name="heat"
                  control={control}
                  defaultValue={{ ...form.heat, date: DateTime.local() }}
                />
              </>
            )}
          </>
        )}
        <FormLabel component="legend">¿Como describirías su caráter?</FormLabel>
        <Controller
          as={
            <Select>
              {character(form.gender).map((character, i) => {
                return (
                  <MenuItem key={i} value={character.value}>
                    {character.label}
                  </MenuItem>
                );
              })}
            </Select>
          }
          name="character"
          rules={{ required: true }}
          control={control}
          defaultValue=""
          variant="outlined"
        />
        <FormLabel component="legend">¿Está {vacunadoa}?</FormLabel>
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Controller as={Button} variant={handleToggle(form.vaccines?.vaccinated)} name="vaccines" control={control} onClick={() => setValue("vaccines", { ...form.vaccines, vaccinated: true })} defaultValue={{ ...form.vaccines, vaccinated: false }}>
            Si
          </Controller>
          <Controller as={Button} variant={handleToggle(!form.vaccines?.vaccinated)} name="vaccines" control={control} onClick={() => setValue("vaccines", { ...form.vaccines, vaccinated: false })} defaultValue={{ ...form.vaccines, vaccinated: false }}>
            No
          </Controller>
        </ButtonGroup>
        {form.vaccines?.vaccinated && (
          <Controller
            as={
              <>
                <FormLabel component="legend">¿Que vacunas tiene?</FormLabel>
                {/* prettier-ignore */}
                <Select 
                  multiple 
                  value={form.vaccines.list || []} 
                  onChange={e => {
                    const [vaccine] = e.target.value
                    console.log("VACCINE CLICKED", vaccine)
                    setValue("vaccines", {...form.vaccines, list: form.vaccines.list?.length ? [...form.vaccines.list, vaccine] : [vaccine]})}
                    } 
                  input={<Input />} 
                  renderValue={(selected) => {
                    console.log("SELECTED", selected)
                    return selected.join(", ")}} 
                  MenuProps={MenuProps}>
                  {vaccines.map((vaccine, i) => (
                    <MenuItem key={i} value={vaccine}>
                      <Checkbox checked={form.vaccines.list?.indexOf(vaccine) > -1} />
                      <ListItemText primary={translate(vaccine, language)} />
                    </MenuItem>
                  ))}
                  </Select>
              </>
            }
            name="vaccines"
            control={control}
            defaultValue={{ ...form.vaccines, list: [] }}
          />
        )}
        <Button variant="outlined" color="primary" type="submit">
          + Añadir
        </Button>
      </ThemeProvider>
    </Form>
  );
});

const mapStateToProps = (state) => {
  return {
    language: state.language.set,
    breedList: state.breed.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postDogCreate: (dog) => dispatch(postData("/dog/create", "dog", dog, "list")),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DogForm);
