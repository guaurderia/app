import React from "react";
import { formatTime } from "../../../services/Format/Time";
import PropTypes from "prop-types";

const AttendanceTime = ({ startTime, endTime }) => {
  const startTimeFormat = formatTime(startTime);
  const endTimeFormat = formatTime(endTime);

  return (
    <div>
      {startTimeFormat && <div>{startTimeFormat}</div>}
      {endTimeFormat && <div>{endTimeFormat}</div>}
    </div>
  );
};

AttendanceTime.propTypes = {
  startTime: PropTypes.string,
  endTime: PropTypes.string,
};

export default AttendanceTime;
