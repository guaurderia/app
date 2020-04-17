import React, { useState, useEffect, useCallback } from "react";
import { DogItemContentGrid, ItemStyle } from "./style";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getData, postData } from "../../redux/actions";
import _ from "lodash";
import { DateTime } from "luxon";
import { formatTime, activeTime } from "../../services/Format/Time";
import { getPass, checkOut } from "../../services/Logic/Pass";

const DogItem = ({ dog, urlParams, postStart, postUpdate, activeAttendance, passList }) => {
  const [attendance, setAttendance] = useState();
  const [button, setButton] = useState("start");
  const [timer, setTimer] = useState({ active: false });
  const [owed, setOwed] = useState(0);
  const [activePasses, setActivePasses] = useState();

  console.log("PASS", activePasses);

  useEffect(() => {
    const [foundActiveAttendance] = activeAttendance.filter((att) => att.dog._id === dog._id);
    if (foundActiveAttendance) {
      const dogActiveAttendance = _.omit(foundActiveAttendance, "dog");
      const startTime = dogActiveAttendance.startTime;
      const endTime = dogActiveAttendance.endTime;

      setAttendance(dogActiveAttendance);
      setActivePasses(() => {
        const dogPasses = passList.filter((pass) => pass.dog._id.toString() === dog._id);
        const active = getPass(dogPasses, true);
        return { active, selected: null };
      });

      if (endTime) {
        setButton("confirm");
        setTimer({ time: activeTime(startTime, endTime), active: false });
      } else {
        setButton("end");
        setTimer({ time: activeTime(startTime), active: true });
      }
    }
  }, []);

  useEffect(() => {
    if (attendance) setOwed(checkOut(attendance, activePasses?.selected));
  }, [activePasses]);

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

  const handlePassSelection = (pass) => useCallback(() => setActivePasses({ ...activePasses, selected: pass }), []);

  const ShowPasses = () => {
    if (activePasses?.length) {
      return activePasses.map((pass, i) => {
        if (pass.type === "day") {
          return (
            <div key={i} onClick={handlePassSelection(pass)}>
              {pass.name} {pass.remainingCount}
            </div>
          );
        }
        if (pass.type === "month")
          return (
            <div key={i} onClick={handlePassSelection(pass)}>
              {pass.name} {pass.expires}
            </div>
          );
      });
    }
    return <></>;
  };

  const selected = () => (urlParams === dog._id ? "active" : "");
  const active = () => (timer.active ? "active-attendance" : "");
  const ended = () => (button === "confirm" ? "ended-attendance" : "");
  return (
    <ItemStyle className={`list-group-item ${selected()} ${active()} ${ended()}`} key={dog._id} to={`/dogs/show/${dog._id}`}>
      <DogItemContentGrid container>
        <Grid item xs={7}>
          {dog.name}
        </Grid>
        <Grid>
          <ShowPasses />
        </Grid>
        <Grid item xs={2}>
          <button onClick={handleClick}>{button}</button>
        </Grid>
        <Grid item xs={3} style={{ display: "flex", justifyContent: "space-around" }}>
          {attendance?.startTime && <ShowTime time={attendance.startTime} />}
          {attendance?.endTime && <ShowTime time={attendance?.endTime} />}
          {timer && <ShowTime time={timer.time} />}
        </Grid>
      </DogItemContentGrid>
    </ItemStyle>
  );
};

const mapStateToProps = (state) => {
  return {
    activeAttendance: state.attendance.active,
    passList: state.pass.list,
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
