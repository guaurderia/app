import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SidebarStyle } from "./style";
import { Card } from "../../components/Card";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import { Link, useParams } from "react-router-dom";
import { dogGeneralDisplay, dogSexDisplay, dogMedicalDisplay, dogOwnerDisplay, dogAttendanceDisplay, dogPassDisplay } from "../../services/Format/Dog";

const Sidebar = ({ dogList, attendanceList, activeAttendance, passList, language }) => {
  const { id } = useParams();
  const [dog, setDog] = useState();
  const [attendance, setAttendance] = useState();
  const [pass, setPass] = useState();

  useEffect(() => {
    setDog(_.head(dogList.filter((d) => d._id.toString() === id)));
    setAttendance(attendanceList.filter((att) => att.dog._id.toString() === id));
    setPass(passList.filter((pass) => pass.dog._id.toString() === id));
  }, [dogList, attendanceList, id, activeAttendance, passList]);

  if (dog && attendance && pass) {
    return (
      <SidebarStyle>
        <Card display={dogGeneralDisplay(dog, language)} />
        <Card display={dogSexDisplay(dog, language)} />
        <Card display={dogMedicalDisplay(dog, language)} />
        <Card display={dogOwnerDisplay(dog, language)} />
        <Card display={dogAttendanceDisplay(attendance, language)} />
        <Card display={dogPassDisplay(pass, true, language)} />
        <Card display={dogPassDisplay(pass, false, language)} />
      </SidebarStyle>
    );
  } else return <div>Loading...</div>;
};

const mapStateToProps = (state) => {
  return {
    dogList: state.dog.list,
    attendanceList: state.attendance.list,
    activeAttendance: state.attendance.active,
    passList: state.pass.list,
    language: state.language.set,
  };
};

export default connect(mapStateToProps)(Sidebar);
