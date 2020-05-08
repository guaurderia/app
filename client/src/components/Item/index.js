import React, { useState, useEffect, useCallback, useRef } from "react";
import { DogItemContentGrid, ItemStyle, PassElement, DogName, AttendanceButton, PassContainer, TimeContainer, OwnerName, DogBreedDisplay } from "./style";
import { connect } from "react-redux";
import { getData, postData, setData } from "../../redux/actions";
import _ from "lodash";
import { DateTime } from "luxon";
import { formatTime, activeTime } from "../../services/Format/Time";
import { getPass, isValidPass, createDayPass } from "../../services/Logic/Pass";
import ErrorMessage from "../Error";
import Popover from "@material-ui/core/Popover";

const DogItem = ({ dog, urlParams, postAttendanceCreate, postAttendanceUpdate, postPassUpdate, activeAttendance, passList, setPassList }) => {
  const [attendance, setAttendance] = useState();
  const [button, setButton] = useState("start");
  const [timer, setTimer] = useState({ active: false });
  const [activePasses, setActivePasses] = useState();
  const [selectedPass, setSelectedPass] = useState();
  const [error, setError] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  useEffect(() => {
    if (activeAttendance.length) {
      const [foundActiveAttendance] = activeAttendance.filter((att) => {
        return att.dog._id === dog._id;
      });
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
    }
  }, []);

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

  const selected = () => (urlParams === dog._id ? "active" : "");
  const active = () => (timer.active ? "active-attendance" : "");
  const ended = () => (button === "confirm" ? "ended-attendance" : "");
  return (
    <ItemStyle className={`list-group-item ${selected()} ${active()} ${ended()}`} key={dog._id} to={`/dogs/show/${dog._id}`}>
      <DogItemContentGrid container>
        <DogName className="dog-name">
          {dog.name}
          <ShowOwnerName />
        </DogName>
        <DogBreedDisplay>{dog.breed?.name}</DogBreedDisplay>
        <AttendanceButton>
          <button onClick={handleClick}>{button}</button>
          {error && <ErrorMessage msg={error} />}
        </AttendanceButton>
        <PassContainer>
          <ShowPasses />
        </PassContainer>
        <TimeContainer item xs={2} style={{ display: "flex", justifyContent: "space-around" }} onClick={handlePopoverOpen}>
          {attendance?.startTime && <ShowTime time={attendance.startTime} />}
          <Popover
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <button>The content of the Popover.</button>
          </Popover>
        </TimeContainer>
        <TimeContainer item xs={2}>
          {attendance?.endTime && <ShowTime time={attendance?.endTime} />}
        </TimeContainer>
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
    setPassList: (newList) => dispatch(setData("pass", newList, "list")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogItem);
