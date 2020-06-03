import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getData, postData, setData } from "../../redux/actions";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness6Icon from "@material-ui/icons/Brightness6";
import { createDayPass } from "../../services/Logic/Pass";
import { formatPassExpires } from "../../services/Format/Time";
import { DateTime, Duration } from "luxon";

export const activeTime = (start, end = null) => {
  const startTime = DateTime.fromISO(start);
  const endTime = end ? DateTime.fromISO(end) : DateTime.local();
  return endTime.diff(startTime).toISO();
};

export const isValidPass = (attendance, pass = null) => {
  if (attendance) {
    const timeISO = activeTime(attendance.startTime, attendance.endTime);
    const totalMinutes = Duration.fromISO(timeISO).as("minutes");
    const inTime = totalMinutes - pass.hours * 60 > 0 ? false : true;
    return inTime;
  } else {
    return false;
  }
};

const PassButton = ({ dog, pass, activePasses, activeAttendances, setSelectedPass }) => {
  const [attendance, setAttendance] = useState();
  const [isValid, setIsValid] = useState(true);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setAttendance(activeAttendances?.find((att) => att.dog.chip === dog.chip));
    setIsValid(isValidPass(attendance, pass));
  }, [activeAttendances]);

  const handleClick = () => {
    if (!selected) setSelected(pass);
  };
  const handlePassCreation = () => {
    createDayPass(dog, attendance);
  };

  if (pass.type === "day") {
    return (
      <button disabled={!isValid} onClick={handleClick}>
        {pass.hours > 6 ? <Brightness5Icon /> : <Brightness6Icon />} DIA ({pass.remainingCount})
      </button>
    );
  }
  if (pass.type === "month") {
    let expiresDate = formatPassExpires(pass.expires);
    return (
      <button disabled={!valid} onClick={handleClick}>
        {pass.hours > 6 ? <Brightness5Icon /> : <Brightness6Icon />} MES ({expiresDate})
      </button>
    );
  }
  return <button onClick={handlePassCreation}>+ DIA</button>;
};

const mapStateToProps = (state) => {
  return {
    activeAttendances: state.attendance.active,
    activePasses: state.pass.active,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedPass: (pass) => dispatch("pass", pass, "selected"),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PassButton);
