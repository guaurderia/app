import React, { useState, useEffect, useReducer } from "react";
import { DogItemContentGrid, LinkStyle } from "./style";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getData, postData } from "../../redux/actions";
import _ from "lodash";

const DogItem = ({ dog, urlParams, postStart, postUpdate, getAttendance, getActiveAttendance, activeAttendance }) => {
  const [attendance, setAttendance] = useState(_.head(activeAttendance));
  const [button, setButton] = useState("start");
  const [timer, setTimer] = useState({ time: activeTime(attendance), active: false });

  useEffect(() => {
    getActiveAttendance(dog._id);
    if (button === "end") setTimer({ ...timer, active: true });
  }, []);

  useEffect(() => {
    if (_.head(activeAttendance)) {
      const [dogActiveAttendance] = activeAttendance.filter((att) => att.dog.toString() === dog._id.toString());
      if (dogActiveAttendance) {
        setAttendance(dogActiveAttendance);
        if (dogActiveAttendance.endTime) {
          setButton("confirm");
          setTimer({ time: activeTime(dogActiveAttendance), active: false });
        } else {
          setButton("end");
          setTimer({ ...timer, active: true });
        }
      }
    }
  }, [activeAttendance]);

  useEffect(() => {
    let interval = null;
    const active = activeTime(attendance);
    if (timer.active) {
      interval = setInterval(() => {
        setTimer({ ...timer, time: active + 1 });
      }, 1000);
    } else if (!timer.active) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  function activeTime(attendance) {
    const startTime = attendance?.startTime ? Math.floor(new Date(attendance.startTime).getTime() / 1000) : undefined;
    const endTime = Math.floor((new Date(attendance?.endTime).getTime() || Date.now()) / 1000);
    return endTime - startTime || 0;
  }

  const handleClick = () => {
    switch (button) {
      case "start":
        const start = { dog: dog._id, startTime: new Date().toJSON(), confirmed: false };
        postStart(start);
        setAttendance(start);
        setButton("end");
        setTimer({ ...timer, active: true });
        break;
      case "end":
        const end = { ...attendance, endTime: new Date().toJSON() };
        postUpdate(end);
        setAttendance(end);
        setButton("confirm");
        setTimer({ ...timer, active: false });
        break;
      case "confirm":
        const confirmed = { ...attendance, confirmed: true };
        postUpdate(confirmed);
        setAttendance({});
        setButton("start");
        setTimer({ ...timer, time: 0 });
        break;
    }
  };

  const ShowTime = ({ time }) => {
    const getTime = _.get(attendance, time);
    if (getTime) {
      const timeFormat = getTime.slice(11, 16);
      return <div>{timeFormat}</div>;
    } else return <></>;
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
          <ShowTime time="startTime" />
          <ShowTime time="endTime" />
          {timer.time > 0 && <div>{timer.time}</div>}
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
    getActiveAttendance: () => dispatch(getData(`/attendance/show/?confirmed=false`, "attendance", "active")),
    getAttendance: () => dispatch(getData(`/attendance/show/all`, "attendance", "list")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogItem);
