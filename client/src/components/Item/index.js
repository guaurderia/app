import React, { useState, useEffect, useReducer } from "react";
import { DogItemContentGrid, LinkStyle } from "./style";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getData, postData } from "../../redux/actions";
import _ from "lodash";

const DogItem = ({ dog, urlParams, postStart, postUpdate, getActiveAttendance, activeAttendance }) => {
  const [attendance, setAttendance] = useState(activeAttendance);
  const [button, setButton] = useState("start");

  console.log("ATT", attendance, "MONGO", activeAttendance);

  useEffect(() => {
    getActiveAttendance(dog._id);
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
        const start = { dog, startTime: new Date(), confirmed: false };
        postStart(start);
        setAttendance(start);
        setButton("end");
        break;
      case "end":
        const end = { ...attendance, endTime: new Date() };
        console.log("END", end);
        postUpdate(end);
        setAttendance(end);
        setButton("confirm");
        break;
      case "confirm":
        const confirmed = { ...attendance, confirmed: true };
        postUpdate(confirmed);
        setAttendance(confirmed);
        setButton("start");
        break;
    }
  };

  const active = () => (urlParams === dog._id ? "active" : "");
  return (
    <LinkStyle className={`list-group-item ${active()}`} key={dog._id} to={`/dogs/show/${dog._id}`}>
      <DogItemContentGrid container>
        <Grid item xs={8}>
          {dog.name}
        </Grid>
        <Grid item xs={2}>
          <button onClick={handleClick}>{button}</button>
        </Grid>
        <Grid item xs={2}>
          <div>{}</div>
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
