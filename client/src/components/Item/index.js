import React, { useState, useEffect, useReducer } from "react";
import { DogItemContentGrid, LinkStyle } from "./style";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getData, postData } from "../../redux/actions";
import _ from "lodash";

const DogItem = ({ dog, urlParams, postStart, postUpdate, getActiveAttendance, activeAttendance }) => {
  const [attendance, setAttendance] = useState(_.head(activeAttendance));
  const [button, setButton] = useState("start");
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const toggleTimer = () => setIsActive(!isActive);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((time) => time + 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  console.log("ATT", attendance, "MONGO", activeAttendance);

  function setTime() {
    if (attendance?.startTime) {
      const secondsPast = (Date.now() - new Date(attendance.startTime).getTime()) / 1000;
      setTimer(secondsPast);
    } else return setTimer(0);
  }

  useEffect(() => {
    getActiveAttendance(dog._id);
    setTime();
  }, []);

  useEffect(() => {
    if (_.head(activeAttendance)) {
      const [dbAttendance] = activeAttendance;
      setAttendance(dbAttendance);
      if (dbAttendance.endTime) setButton("confirm");
      else setButton("end");
    }
  }, [activeAttendance]);

  const handleClick = () => {
    switch (button) {
      case "start":
        const start = { dog: dog._id, startTime: new Date().toJSON(), confirmed: false };
        postStart(start);
        setAttendance(start);
        setButton("end");
        toggleTimer();
        break;
      case "end":
        const end = { ...attendance, endTime: new Date().toJSON() };
        postUpdate(end);
        setAttendance(end);
        setButton("confirm");
        toggleTimer();
        break;
      case "confirm":
        const confirmed = { ...attendance, confirmed: true };
        postUpdate(confirmed);
        setAttendance({});
        setButton("start");
        setTimer(0);
        break;
    }
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
          {attendance?.startTime && <div>{attendance.startTime.slice(11, 16)}</div>}
          {attendance?.endTime && <div>{attendance.endTime.slice(11, 16)}</div>}
          <div>{timer}</div>
        </Grid>
      </DogItemContentGrid>
    </LinkStyle>
  );
};

const mapStateToProps = (state) => {
  return {
    activeAttendance: state.attendance.selected,
    loading: state.attendance.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postStart: (obj) => dispatch(postData("/attendance/create", "attendance", obj)),
    postUpdate: (obj) => dispatch(postData(`/attendance/update/?dog=${obj.dog}&confirmed=false`, "attendance", obj)),
    getActiveAttendance: (dogId) => dispatch(getData(`/attendance/show/?dog=${dogId}&confirmed=false`, "attendance", "selected")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogItem);
