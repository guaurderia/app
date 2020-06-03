import React from "react";
import { DogItemContentGrid, DogName, PassContainer, DogBreedDisplay } from "./style";
import { connect } from "react-redux";
import { getData, postData, setData } from "../../redux/actions";
import _ from "lodash";
import ActiveTime from "../";
import AttendanceButton from "../AttendanceButton"

const DogItem = ({ dog, activePasses }) => {
  const passes = activePasses.filter(pass => pass.dogChip === dog.chip)
  return (
    <DogItemContentGrid container>
      <DogName className="dog-name">
        {dog.name}
        <ShowOwnerName />
      </DogName>
      <DogBreedDisplay>{dog.breed?.name}</DogBreedDisplay>
      <AttendanceButton {...{ dog }} />
      <PassContainer>
        {passes.map(pass => {
          return <PassButton {...{ dog, pass }} />
        })}
      </PassContainer>
      <ActiveTime startTime={attendance?.startTime} endTime={attendance?.endTime} />
    </DogItemContentGrid>
  );
}

const mapStateToProps = (state) => {
  return {
    activeAttendance: state.attendance.active,
    attendanceList: state.attendance.list,
    activePasses: state.pass.active,
    attendanceLoading: state.attendance.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postPassUpdate: (obj) => dispatch(postData(`/pass/update/?_id=${obj.id}`, "pass", obj, "list")),
    setPassList: (newList) => dispatch(setData("pass", newList, "list")),
    deleteAttendance: (id) => dispatch(getData(`/attendance/delete/${id}`, "attendance", "list")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogItem);
