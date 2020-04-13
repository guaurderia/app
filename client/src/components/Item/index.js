import React, { useState, useEffect } from "react";
import { DogItemContentGrid, LinkStyle } from "./style";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getData, postData } from "../../redux/actions";

const calculateTime = () => {
  let timeLeft = {
    days: Math.floor(1000 * 60 * 60 * 24),
    hours: Math.floor((1000 * 60 * 60) % 24),
    minutes: Math.floor((1000 / 60) % 60),
    seconds: Math.floor(1000 % 60),
  };
  return timeLeft;
};

const DogItem = ({ dog, urlParams, getActiveAttendance, postStart, postUpdate, activeAttendances }) => {
  const [time, setTime] = useState(0);
  const [attendance, setAttendance] = useState(null);
  const [button, setButton] = useState("start");

  console.log("ATT AT TOP", attendance, activeAttendances, button);

  useEffect(() => {
    getActiveAttendance();
  }, []);

  useEffect(() => {
    if (activeAttendances) {
      const [dogAttendance] = activeAttendances.filter((att) => {
        return att.dog.toString() === dog._id.toString();
      });
      setAttendance(dogAttendance);
      handleButtonState();
    } else {
      setAttendance(null);
    }
  }, [activeAttendances]);

  useEffect(() => {
    handleButtonState();
  }, [attendance]);

  const handleButtonState = () => {
    if (attendance) {
      if (attendance.endTime) setButton("confirm");
      else setButton("end");
    } else {
      setButton("start");
    }
  };

  const handleTimer = () => {
    switch (button) {
      case "start":
        postStart({ dog, startTime: Date.now(), confirmed: false });
        break;
      case "end":
        postUpdate({ ...attendance, endTime: Date.now() });
        break;
      case "confirm":
        postUpdate({ ...attendance, confirmed: true });
        break;
    }
    setAttendance(getActiveAttendance(dog._id));
    handleButtonState();
    getActiveAttendance();
  };

  const active = () => (urlParams === dog._id ? "active" : "");
  return (
    <LinkStyle className={`list-group-item ${active()}`} key={dog._id} to={`/dogs/show/${dog._id}`}>
      <DogItemContentGrid container>
        <Grid item xs={8}>
          {dog.name}
        </Grid>
        <Grid item xs={2}>
          <button onClick={(e) => handleTimer()}>{button}</button>
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
    serverRequest: state.attendance.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postStart: (obj) => dispatch(postData("/attendance/create", "attendance", obj)),
    postUpdate: (obj) => dispatch(postData(`/attendance/update/${obj._id}`, "attendance", obj)),
    getActiveAttendance: () => dispatch(getData(`/attendance/show/?confirmed=false`, "attendance", "active")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogItem);
