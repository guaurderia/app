import React, { useState, useEffect, useCallback, useRef } from "react";
import { DogItemContentGrid, ItemStyle, PassElement, DogName, AttendanceButton, PassContainer, TimeContainer, OwnerName, DogBreedDisplay } from "./style";
import { connect } from "react-redux";
import { getData, postData, setData } from "../../redux/actions";
import _ from "lodash";
import { DateTime } from "luxon";
import { formatTime, activeTime } from "../../services/Format/Time";
import { getPass, isValidPass, createDayPass } from "../../services/Logic/Pass";
import ErrorMessage from "../Error";
import TimeEditor from "./components/TimeEditor";
import { CircularProgress } from "@material-ui/core";

const DogItem = (props) => {
  const { dog, urlParams, postAttendanceCreate, postAttendanceUpdate, postPassUpdate, activeAttendance, passList, setPassList, deleteAttendance, attendanceList, attendanceLoading, getActiveAttendances } = props;
  const [attendance, setAttendance] = useState();
  const [button, setButton] = useState("start");
  const [timer, setTimer] = useState({ active: false });
  const [activePasses, setActivePasses] = useState();
  const [selectedPass, setSelectedPass] = useState();
  const [error, setError] = useState();
  const [openEditor, setOpenEditor] = useState({ start: false, end: false });

  useEffect(() => {
    if (activeAttendance.length) {
      const [foundActiveAttendance] = activeAttendance.filter((att) => {
        return att.dog._id === dog._id;
      });
      if (foundActiveAttendance) {
        const dogActiveAttendance = _.omit(foundActiveAttendance, "dog");
        const startTime = dogActiveAttendance.startTime;
        const endTime = dogActiveAttendance.endTime;

        setAttendance({ ...dogActiveAttendance, dog: dog._id });
        console.log("ATT IN EFFECT", attendance);

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
    }
  }, [activeAttendance]);

  useEffect(() => {
    setActivePasses(() => {
      const dogPasses = passList.filter((pass) => {
        return pass.dog?.chip === dog.chip;
      });
      const active = getPass(dogPasses, true);
      if (attendance) {
        const validPasses = isValidPass(attendance, active);
        const selectedIsValid = validPasses?.some((pass) => {
          return selectedPass?.id === pass.id;
        });
        if (!selectedIsValid) setSelectedPass();
        return validPasses;
      } else {
        setSelectedPass();
        return active;
      }
    });
  }, [attendance, passList]);

  const handleClick = async () => {
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

  const handleTimeEditor = (time) => {
    if (time === "start") setOpenEditor({ start: true });
    if (time === "end") setOpenEditor({ end: true });
  };

  const handleDeleteAttendance = async () => {
    console.log("ATT IN DELETE", attendance);
    deleteAttendance(attendance._id);
    setTimer({ active: false });
    setButton("start");
    setAttendance();
  };

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
    let selected = "";
    if (activePasses?.length) {
      return activePasses.map((pass, i) => {
        if (pass.type === "day") {
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
              {pass.name} (expira {pass.expires})
            </PassElement>
          );
        }
      });
    } else if (attendance?.endTime) {
      return <PassElement onClick={handlePassCreation}>Crea un pase de día</PassElement>;
    }
    return <></>;
  };

  const ShowOwnerName = () => {
    return dog.owner.map((owner) => <OwnerName key={owner.username}>{`${owner.firstName} ${owner.lastName}`}</OwnerName>);
  };

  const active = () => (timer.active ? "active-attendance" : "");
  const ended = () => (button === "confirm" ? "ended-attendance" : "");
  return (
    <ItemStyle className={`list-group-item ${active()} ${ended()}`} key={dog._id} to={`/dogs/show/${dog._id}`}>
      <DogItemContentGrid container>
        <DogName className="dog-name">
          {dog.name}
          <ShowOwnerName />
        </DogName>
        <DogBreedDisplay>{dog.breed?.name}</DogBreedDisplay>
        <AttendanceButton>
          <button onClick={handleClick}>{button}</button>
          {attendance && <button onClick={handleDeleteAttendance}>Cancelar</button>}
          {error && <ErrorMessage msg={error} />}
        </AttendanceButton>
        <PassContainer>
          <ShowPasses />
        </PassContainer>
        <TimeContainer item xs={2} style={{ display: "flex", justifyContent: "space-around" }} onClick={() => handleTimeEditor("start")}>
          {attendance?.startTime && openEditor.start ? <TimeEditor time={attendance.startTime} value="startTime" {...{ attendance, setAttendance, setOpenEditor }} /> : attendance?.startTime && <ShowTime time={attendance.startTime} />}
        </TimeContainer>
        <TimeContainer item xs={2} onClick={() => handleTimeEditor("end")}>
          {attendance?.endTime && openEditor.end ? <TimeEditor time={attendance.endTime} value="endTime" {...{ attendance, setAttendance, setOpenEditor }} /> : attendance?.endTime && <ShowTime time={attendance.endTime} />}
        </TimeContainer>
      </DogItemContentGrid>
    </ItemStyle>
  );
};

const mapStateToProps = (state) => {
  return {
    activeAttendance: state.attendance.active,
    attendanceList: state.attendance.list,
    passList: state.pass.list,
    attendanceLoading: state.attendance.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postAttendanceCreate: (obj) => dispatch(postData("/attendance/create", "attendance", obj, "active")),
    postAttendanceUpdate: (obj) => dispatch(postData(`/attendance/update/?dog=${obj.dog}&confirmed=false`, "attendance", obj, "active")),
    postPassUpdate: (obj) => dispatch(postData(`/pass/update/?_id=${obj.id}`, "pass", obj, "list")),
    setPassList: (newList) => dispatch(setData("pass", newList, "list")),
    deleteAttendance: (id) => dispatch(getData(`/attendance/delete/${id}`, "attendance", "list")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogItem);
