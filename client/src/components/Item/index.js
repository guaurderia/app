import React, { useState, useEffect, useCallback, useRef } from "react";
import { DogItemContentGrid, ItemStyle, PassElement } from "./style";
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
  const [selectedPass, setSelectedPass] = useState();

  console.log("ACTIVE PASSES AT TOP", activePasses?.selected);

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
        const validPasses = isValidPass(attendance, active);
        console.log("VALID PASSES", validPasses, active);
        const selectedIsValid = validPasses.some((pass) => selectedPass === pass);
        if (!selectedIsValid) setSelectedPass(_.head(validPasses));
        return validPasses;
      } else {
        return active;
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
        checkOut(selectedPass);
        break;
    }
  };

  const ShowTime = ({ time }) => {
    const timeFormat = formatTime(time);
    if (timeFormat) return <div>{timeFormat}</div>;
    else return <></>;
  };

  const handlePassSelection = (pass) => useCallback(() => setSelectedPass(pass));

  function checkOut(pass) {
    if (pass) {
      const { id } = pass;
      if (pass.type === "day") {
        const updatedPass = { id, count: pass.remainingCount - 1 };
        console.log("ACTIVE PASS IN CHECKOUT", activePasses);
        postPassUpdate(updatedPass);
      }
    }
  }

  const ShowPasses = () => {
    let selected = "";
    if (activePasses?.length) {
      return activePasses.map((pass, i) => {
        if (pass.type === "day") {
          selected = pass === selectedPass ? "selected" : "";
          return (
            <PassElement key={i} onClick={handlePassSelection(pass)} className={selected}>
              {pass.name} {pass.remainingCount}
            </PassElement>
          );
        }
        if (pass.type === "month") {
          selected = pass === selectedPass ? "selected" : "";
          return (
            <PassElement key={i} onClick={handlePassSelection(pass)} className={selected}>
              {pass.name} {pass.expires}
            </PassElement>
          );
        }
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
