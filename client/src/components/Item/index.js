import React, { useState, useEffect, useCallback } from "react";
import { DogItemContentGrid, ItemStyle } from "./style";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getData, postData } from "../../redux/actions";
import _ from "lodash";
import { DateTime } from "luxon";
import { formatTime, activeTime } from "../../services/Format/Time";
import { getPass, isValidPass } from "../../services/Logic/Pass";

const DogItem = ({ dog, urlParams, postAttendanceCreate, postAttendanceUpdate, postPassUpdate, activeAttendance, passList }) => {
  const [attendance, setAttendance] = useState();
  const [button, setButton] = useState("start");
  const [timer, setTimer] = useState({ active: false });
  const [activePasses, setActivePasses] = useState();

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
    } else {
      setAttendance(null);
    }
  }, []);

  useEffect(() => {
    setActivePasses(() => {
      const dogPasses = passList.filter((pass) => pass.dog._id.toString() === dog._id);
      const active = getPass(dogPasses, true);
      if (attendance) {
        const validPass = isValidPass(attendance, active);
        return { valid: validPass, selected: _.head(validPass) };
      } else {
        return { valid: active, selected: _.head(active) };
      }
    });
  }, [attendance, passList]);

  const handleClick = () => {
    switch (button) {
      case "start":
        const start = { dog: dog._id, startTime: DateTime.local().toJSON(), confirmed: false };
        postAttendanceCreate(start);
        setAttendance(start);
        setButton("end");
        setTimer({ ...timer, active: true });
        break;
      case "end":
        const end = { ...attendance, dog: dog._id, endTime: DateTime.local().toJSON() };
        postAttendanceUpdate(end);
        setAttendance(end);
        setButton("confirm");
        setTimer({ ...timer, active: false });
        break;
      case "confirm":
        const confirmed = { ...attendance, dog: dog._id, confirmed: true };
        postAttendanceUpdate(confirmed);
        setAttendance({});
        setButton("start");
        setTimer({ active: false });
        checkOut(activePasses.selected);
        break;
    }
  };

  const ShowTime = ({ time }) => {
    const timeFormat = formatTime(time);
    if (timeFormat) return <div>{timeFormat}</div>;
    else return <></>;
  };

  const handlePassSelection = (pass) => useCallback(() => setActivePasses({ ...activePasses, selected: pass }), []);

  function checkOut(pass) {
    if (pass) {
      const { id } = pass;
      if (pass.type === "day") {
        const updatedPass = { id, count: pass.remainingCount - 1 };
        postPassUpdate(updatedPass);
      }
    }
  }

  const ShowPasses = () => {
    if (activePasses?.valid?.length) {
      return activePasses.valid.map((pass, i) => {
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
        <Grid item xs={8}>
          {dog.name}
        </Grid>
        <Grid item xs={4}>
          <button onClick={handleClick}>{button}</button>
        </Grid>
        <Grid item xs={6}>
          <ShowPasses />
        </Grid>
        <Grid item xs={4} style={{ display: "flex", justifyContent: "space-around" }}>
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
    postAttendanceCreate: (obj) => dispatch(postData("/attendance/create", "attendance", obj, "list")),
    postAttendanceUpdate: (obj) => dispatch(postData(`/attendance/update/?dog=${obj.dog}&confirmed=false`, "attendance", obj, "list")),
    postPassUpdate: (obj) => dispatch(postData(`/pass/update/?_id=${obj.id}`, "pass", obj, "list")),
    getAttendance: () => dispatch(getData(`/attendance/show/all`, "attendance", "list")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogItem);
