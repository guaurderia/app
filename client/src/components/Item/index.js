import React, { useState, useEffect } from "react";
import { DogItemContentGrid, LinkStyle } from "./style";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getData, postData } from "../../redux/actions";
import _ from "lodash";
import { DateTime } from "luxon";
import { formatTime, activeTime } from "../../services/Time";

const DogItem = ({ dog, urlParams, postStart, postUpdate, activeAttendance }) => {
  const [attendance, setAttendance] = useState();
  const [button, setButton] = useState("start");
  const [timer, setTimer] = useState({ active: false });

  console.log(timer);

  useEffect(() => {
    const [foundActiveAttendance] = activeAttendance.filter((att) => att.dog._id === dog._id);
    if (foundActiveAttendance) {
      const dogActiveAttendance = _.omit(foundActiveAttendance, "dog");
      const startTime = dogActiveAttendance.startTime;
      const endTime = dogActiveAttendance.endTime;
      setAttendance(dogActiveAttendance);
      if (endTime) {
        setButton("confirm");
        setTimer({ time: activeTime(startTime, endTime), active: false });
      } else {
        setButton("end");
        setTimer({ time: activeTime(startTime), active: true });
      }
    }
  }, [activeAttendance]);

  const handleClick = () => {
    switch (button) {
      case "start":
        const start = { dog: dog._id, startTime: DateTime.local().toJSON(), confirmed: false };
        postStart(start);
        setAttendance(start);
        setButton("end");
        setTimer({ ...timer, active: true });
        break;
      case "end":
        const end = { ...attendance, dog: dog._id, endTime: DateTime.local().toJSON() };
        postUpdate(end);
        setAttendance(end);
        setButton("confirm");
        setTimer({ ...timer, active: false });
        break;
      case "confirm":
        const confirmed = { ...attendance, dog: dog._id, confirmed: true };
        postUpdate(confirmed);
        setAttendance({});
        setButton("start");
        setTimer({ active: false });
        break;
    }
  };

  const ShowTime = ({ time }) => {
    const timeFormat = formatTime(time);
    if (timeFormat) return <div>{timeFormat}</div>;
    else return <></>;
  };

  const active = () => (urlParams === dog._id ? "active" : "");
  return (
    <LinkStyle className={`list-group-item ${active()}`} key={dog._id} to={`/dogs/show/${dog._id}`}>
      <DogItemContentGrid container>
        <Grid item xs={7}>
          {dog.name}
        </Grid>
        <Grid item xs={2}>
          <button onClick={handleClick}>{button}</button>
        </Grid>
        <Grid item xs={3} style={{ display: "flex", justifyContent: "space-around" }}>
          {attendance?.startTime && <ShowTime time={attendance.startTime} />}
          {attendance?.endTime && <ShowTime time={attendance?.endTime} />}
          {timer && <ShowTime time={timer} />}
        </Grid>
      </DogItemContentGrid>
    </LinkStyle>
  );
};

const mapStateToProps = (state) => {
  return {
    activeAttendance: state.attendance.active,
    loading: state.attendance.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postStart: (obj) => dispatch(postData("/attendance/create", "attendance", obj, "list")),
    postUpdate: (obj) => dispatch(postData(`/attendance/update/?dog=${obj.dog}&confirmed=false`, "attendance", obj, "list")),
    getAttendance: () => dispatch(getData(`/attendance/show/all`, "attendance", "list")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogItem);
