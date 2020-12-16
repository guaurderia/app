import React from "react";
import { useForm } from "react-hook-form";
import { formatTime } from "../../../services/Format/Time";
import { DateTime } from "luxon";
import { postData } from "../../../redux/actions";
import { connect } from "react-redux";

const TimeEditor = ({ time, value, attendance, setAttendance, setOpenEditor, postAttendanceUpdate }) => {
  const { register, handleSubmit } = useForm();
  const dateFormat = formatTime(time);
  const onSubmit = (data) => {
    const time = DateTime.fromISO(data[value]).toJSON();
    const editedAttendance = { ...attendance, [value]: time };
    postAttendanceUpdate(editedAttendance);
    setAttendance(editedAttendance);
    setOpenEditor(false);
  };
  console.log("ATTENDANCE IN EDITOR", attendance);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name={value} ref={register} defaultValue={dateFormat} />
      <input type="submit" />
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postAttendanceUpdate: (obj) => dispatch(postData(`/attendance/update/?dog=${obj.dog}&confirmed=false`, "attendance", obj, "list")),
  };
};

export default connect(null, mapDispatchToProps)(TimeEditor);
