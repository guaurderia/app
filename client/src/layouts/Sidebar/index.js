import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SidebarStyle } from "./style";
import { Card } from "../../components/Card";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import { Link, useParams } from "react-router-dom";
import { dogGeneralDisplay, dogSexDisplay, dogMedicalDisplay, dogOwnerDisplay, dogAttendanceDisplay, dogPassDisplay } from "./utils/cardData";

const Sidebar = ({ dogList, attendanceList, activeAttendance, passList }) => {
  const { id } = useParams();
  const [dog, setDog] = useState();
  const [attendance, setAttendance] = useState();
  const [pass, setPass] = useState();

  console.log("ATTLIST IN SIDEBAR", attendanceList);

  useEffect(() => {
    if (dogList) setDog(_.head(dogList.filter((d) => d._id.toString() === id)));
    if (attendanceList) setAttendance(attendanceList.filter((att) => att.dog._id.toString() === id));
    if (passList) setPass(passList.filter((pass) => pass.dog._id.toString() === id));
  }, [dogList, attendanceList, id, activeAttendance, passList]);

  if (dog && attendance && pass) {
    console.log("SIDEBAR BEFORE RETURN", dog, attendance);
    return (
      <SidebarStyle>
        <Card display={dogGeneralDisplay(dog, "es")} />
        <Card display={dogSexDisplay(dog, "es")} />
        <Card display={dogMedicalDisplay(dog, "es")} />
        <Card display={dogOwnerDisplay(dog, "es")} />
        <Card display={dogAttendanceDisplay(attendance, "es")} />
        <Card display={dogPassDisplay(pass, true, "es")} />
        <Card display={dogPassDisplay(pass, false, "es")} />
        <Button variant="contained">
          <Link to={`/dogs/edit/${dog._id}`}>Editar</Link>
        </Button>
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
  };
};

export default connect(mapStateToProps)(Sidebar);
