import React, { useState, useEffect, useCallback, useRef } from "react";
import { DogItemContentGrid, ItemStyle, PassElement } from "./style";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getData, postData, setData } from "../../redux/actions";
import _ from "lodash";
import { DateTime } from "luxon";
import { formatTime, activeTime } from "../../services/Format/Time";
import { getPass, isValidPass, createDayPass } from "../../services/Logic/Pass";
import ErrorMessage from "../Error";

const DogItem = ({ dog, urlParams, postAttendanceCreate, postAttendanceUpdate, postPassUpdate, activeAttendance, passList, setPassList }) => {
  const [attendance, setAttendance] = useState();
  const [button, setButton] = useState("start");
  const [timer, setTimer] = useState({ active: false });
  const [activePasses, setActivePasses] = useState();
  const [selectedPass, setSelectedPass] = useState();
  const [error, setError] = useState();

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
        const selectedIsValid = validPasses?.some((pass) => {
          return selectedPass?.id === pass.id;
        });
        if (!selectedIsValid) setSelectedPass();
        console.log("VALID PASSES", validPasses, dog.name);
        return validPasses;
      } else {
        setSelectedPass();
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
        if (selectedPass) {
          const confirmed = { ...attendance, dog: dog._id, confirmed: true };
          postAttendanceUpdate(confirmed);
          setAttendance({});
          setButton("start");
          setTimer({ active: false });
          checkOut(selectedPass);
          setSelectedPass();
          setError();
        } else {
          setError("Tienes que selectionar un bono");
        }
        break;
    }
  };

  const ShowTime = ({ time }) => {
    const timeFormat = formatTime(time);
    if (timeFormat) return <div>{timeFormat}</div>;
    else return <></>;
  };

  const handlePassSelection = (pass) =>
    useCallback(() => {
      if (attendance) setSelectedPass(pass);
    });

  const handlePassCreation = () => {
    createDayPass(dog, attendance).then((res) => setPassList(res.data));
  };

  function checkOut(pass) {
    if (pass) {
      const { id } = pass;
      if (pass.type === "day" || pass.type === "one") {
        const updatedPass = { id, count: pass.remainingCount - 1 };
        postPassUpdate(updatedPass);
      }
    }
  }

  const ShowPasses = () => {
    let selected = "";
    if (activePasses?.length) {
      console.log("SHOW PASSES IF", activePasses.length, dog.name, activePasses);
      return activePasses.map((pass, i) => {
        if (pass.type === "day" || pass.type === "one") {
          selected = pass.id === selectedPass?.id ? "selected" : "";
          return (
            <PassElement key={i} onClick={handlePassSelection(pass)} className={selected}>
              {pass.name} {pass.remainingCount}
            </PassElement>
          );
        }
        if (pass.type === "month") {
          selected = pass.id === selectedPass?.id ? "selected" : "";
          return (
            <PassElement key={i} onClick={handlePassSelection(pass)} className={selected}>
              {pass.name} {pass.expires}
            </PassElement>
          );
        }
      });
    } else if (attendance?.endTime) {
      console.log("SHOW PASSES ELSE");
      return <PassElement onClick={handlePassCreation}>Crea un pase de día</PassElement>;
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
<<<<<<< HEAD
        <Grid item xs={2}>
          <button onClick={(e) => handleTimer()}>{button}</button>
        </Grid>
        <Grid item xs={2}>
          <div>{}</div>
        </Grid>
      </DogItemContentGrid>
    </LinkStyle>
=======
        <Grid item xs={4}>
          <button onClick={handleClick}>{button}</button>
          {error && <ErrorMessage msg={error} />}
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
>>>>>>> 3a38678c63fd2a514d6ad53182916cd79d259485
  );
};

const mapStateToProps = (state) => {
  return {
<<<<<<< HEAD
    attendanceList: state.attendance.data,
    awaitingServer: state.attendance.loading,
=======
    activeAttendance: state.attendance.active,
    passList: state.pass.list,
>>>>>>> 3a38678c63fd2a514d6ad53182916cd79d259485
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
<<<<<<< HEAD
    postStart: (obj) => dispatch(postData("/attendance/create", "attendance", obj)),
    postUpdate: (obj) => dispatch(postData(`/attendance/update/${obj._id}`, "attendance", obj)),
=======
    postAttendanceCreate: (obj) => dispatch(postData("/attendance/create", "attendance", obj, "list")),
    postAttendanceUpdate: (obj) => dispatch(postData(`/attendance/update/?dog=${obj.dog}&confirmed=false`, "attendance", obj, "list")),
    postPassUpdate: (obj) => dispatch(postData(`/pass/update/?_id=${obj.id}`, "pass", obj, "list")),
    getAttendance: () => dispatch(getData(`/attendance/show/all`, "attendance", "list")),
    setPassList: (obj) => dispatch(setData("pass", obj, "list")),
>>>>>>> 3a38678c63fd2a514d6ad53182916cd79d259485
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogItem);
