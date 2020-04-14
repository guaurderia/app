import React, { useState, useEffect, useReducer } from "react";
import { DogItemContentGrid, LinkStyle } from "./style";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getData, postData } from "../../redux/actions";
import axios from "axios";

const DogItem = ({ dog, urlParams, postStart, postUpdate, activeAttendances }) => {
  const [attendance, setAttendance] = useState({});
  const [button, setButton] = useState("start");

  const handleClick = () => {
    switch (button) {
      case "start":
        const start = { dog, startTime: new Date(), confirmed: false };
        postStart(start);
        setAttendance(start);
        setButton("end");
        break;
      case "end":
        const end = { endTime: new Date() };
        postUpdate(end);
        setAttendance({ ...attendance, ...end });
        setButton("confirm");
        break;
      case "confirm":
        const confirmed = { confirmed: true };
        postUpdate(confirmed);
        setAttendance({ ...attendance, ...confirmed });
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
    activeAttendances: state.attendance.active,
    loading: state.attendance.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postStart: (obj) => dispatch(postData("/attendance/create", "attendance", obj)),
    postUpdate: (obj) => dispatch(postData(`/attendance/update/${obj._id}`, "attendance", obj)),
    getActiveAttendance: () => dispatch(getData("/attendance/show/?confirmed=false", "attendance", "active")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogItem);
