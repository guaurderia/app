import React from "react";
import { formatTime } from "../../services/Format/Time";
import PropTypes from "prop-types";

const ActiveTime = ({ startTime, endTime }) => {
  const startTimeFormat = formatTime(startTime);
  const endTimeFormat = formatTime(endTime);

  return (
    <div>
      {startTimeFormat && <div>{startTimeFormat}</div>}
      {endTimeFormat && <div>{endTimeFormat}</div>}
    </div>
  );
};

ActiveTime.propTypes = {
  startTime: PropTypes.string,
  endTime: PropTypes.string,
};

export default ActiveTime;
