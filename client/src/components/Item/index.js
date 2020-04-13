import React, { useState, useEffect } from "react";
import { DogItemContentGrid, LinkStyle } from "./style";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { postData } from "../../redux/actions";

const calculateTime = () => {
  let timeLeft = {
    days: Math.floor(1000 * 60 * 60 * 24),
    hours: Math.floor((1000 * 60 * 60) % 24),
    minutes: Math.floor((1000 / 60) % 60),
    seconds: Math.floor(1000 % 60),
  };
  return timeLeft;
};

const DogItem = ({ dog, urlParams, postStart, postUpdate, attendanceList }) => {
  const [time, setTime] = useState(0);
  const [attendance, setAttendance] = useState(null);
  const [button, setButton] = useState("start");

  useEffect(() => {
    console.log("ATT LIST", attendanceList);
    getAttendanceId();
  }, [attendanceList]);

  console.log("TOP", attendance);

  const getAttendanceId = () => {
    if (attendanceList) {
      console.log("ATT LIST IN GET", attendanceList);
      const [foundAttedance] = attendanceList.filter((att) => {
        return att.dog.toString() === dog._id.toString();
      });
      if (foundAttedance) {
        setButton("end");
        setAttendance(foundAttedance);
        if (foundAttedance.endTime) setButton("confirm");
      }
    }
  };

  const handleTimer = () => {
    switch (button) {
      case "start":
        postStart({ dog, startTime: Date.now() });
        break;
      case "end":
        postUpdate({ ...attendance, endTime: Date.now() });
      case "confirm":
        postUpdate({ ...attendance, confirm: true });
    }
    console.log("ATT AFTER BUTT", attendance);
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
    attendanceList: state.attendance.data,
    awaitingServer: state.attendance.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postStart: (obj) => dispatch(postData("/attendance/create", "attendance", obj)),
    postUpdate: (obj) => dispatch(postData(`/attendance/update/${obj._id}`, "attendance", obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogItem);
