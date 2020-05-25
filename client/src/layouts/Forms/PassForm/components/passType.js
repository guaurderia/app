import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useFormContext, Controller, ErrorMessage } from "react-hook-form";
import { inputStyle, Error } from "../../style";
import _ from "lodash";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const PassTypeInput = ({ passTypeList }) => {
  const { watch, errors } = useFormContext();
  const passType = watch("passType");
  const isError = !_.isEmpty(errors?.passType);
  const requiredMessage = "Elije un bono";

  return (
    <>
      <FormLabel component="legend">¿Que tipo de bono quiere?</FormLabel>
      <Controller
        as={
          <Select>
            {passTypeList.map((passType, i) => {
              return (
                <MenuItem key={i} value={passType}>
                  {passType.name}
                </MenuItem>
              );
            })}
          </Select>
        }
        name="passType"
        rules={{ required: requiredMessage }}
        defaultValue={passType || ""}
        {...inputStyle}
        error={isError}
      />
      <ErrorMessage {...{ errors }} name="passType" as={Error} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    passTypeList: state.passType.list,
  };
};

export default connect(mapStateToProps)(PassTypeInput);
