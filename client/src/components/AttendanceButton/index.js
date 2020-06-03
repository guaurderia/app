import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { postData } from "../../redux/actions";
import { translate } from "../../services/Language";
import { DateTime } from "luxon";

const AttendanceButton = ({ dog, activeAttendances, selectedPasses, postAttendanceCreate, postAttendanceUpdate }) => {
  const [buttonState, setButtonState] = useState("start");
  const [attendance, setAttendance] = useState();
  const [selectedPass, setSelectedPass] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const foundAttendance = activeAttendances.find((att) => att.dog.chip === dog.chip);
    if (foundAttendance) {
      setAttendance(foundAttendance);
      if (foundAttendance.endTime) setButtonState("confirm");
      else setButtonState("end");
    }
    setSelectedPass(selectedPasses?.find((pass) => pass.dogChip === dog.chip));
  }, [activeAttendances, selectedPasses]);

  const handleClick = () => {
    switch (buttonState) {
      case "start":
        const start = { dog: dog._id, startTime: DateTime.local().toJSON(), confirmed: false };
        postAttendanceCreate(start);
        setButtonState("end");
        break;
      case "end":
        const end = { ...attendance, dog: dog._id, endTime: DateTime.local().toJSON() };
        postAttendanceUpdate(end);
        setButtonState("confirm");
        break;
      case "confirm":
        if (selectedPass) {
          const confirmed = { ...attendance, dog: dog._id, confirmed: true };
          postAttendanceUpdate(confirmed);
          setButtonState("start");
          pass.type === "day" && postPassUpdate(pass);
          setError("");
        } else {
          setError("Tienes que seleccionar un bono");
        }
        break;
    }
  };
  return (
    <>
      <button onClick={handleClick}>{translate(buttonState, "es")}</button>
      {error && <div>{error}</div>}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    activeAttendances: state.attendance.active,
    selectedPasses: state.pass.selected,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postAttendanceCreate: (obj) => dispatch(postData("/attendance/create", "attendance", obj, "active")),
    postAttendanceUpdate: (obj) => dispatch(postData(`/attendance/update/active/?dog=${obj.dog}&confirmed=false`, "attendance", obj, "active")),
    postPassUpdate: (obj) => dispatch(postData(`/pass/update/?dog=${obj.dog}&confirmed=false`, "attendance", obj, "list")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceButton);
