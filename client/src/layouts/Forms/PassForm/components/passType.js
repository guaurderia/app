import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useFormContext, Controller } from "react-hook-form";
import { inputStyle } from "../../style";
import _ from "lodash";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const PassTypeInput = ({ passTypeList }) => {
  const { watch } = useFormContext();
  const passType = watch("passType");

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
        rules={{ required: true }}
        defaultValue={passType || ""}
        {...inputStyle}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    passTypeList: state.passType.list,
  };
};

export default connect(mapStateToProps)(PassTypeInput);
