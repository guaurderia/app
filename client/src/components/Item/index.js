import React, { useState, useEffect } from "react";
import { DogItemContentGrid, LinkStyle } from "./style";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getData, postData } from "../../redux/actions";

const DogItem = ({ dog, urlParams, getActiveAttendance, postStart, postUpdate, activeAttendances, loading }) => {
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
    } else {
      setAttendance(null);
    }
    handleButtonState();
  }, [loading]);

  const handleButtonState = () => {
    if (attendance) {
      if (attendance.endTime) setButton("confirm");
      else setButton("end");
    } else {
      setButton("start");
    }
  };

  const handleClick = () => {
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
    getActiveAttendance();
    setButton("loading...");
  };

  const active = () => (urlParams === dog._id ? "active" : "");
  return (
    <LinkStyle className={`list-group-item ${active()}`} key={dog._id} to={`/dogs/show/${dog._id}`}>
      <DogItemContentGrid container>
        <Grid item xs={8}>
          {dog.name}
        </Grid>
        <Grid item xs={2}>
          <button onClick={(e) => handleClick()}>{button}</button>
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
    getActiveAttendance: () => dispatch(getData(`/attendance/show/?confirmed=false`, "attendance", "active")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogItem);
