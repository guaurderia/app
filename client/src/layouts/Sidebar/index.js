import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SidebarStyle } from "./style";
import { Card } from "../../components/Card";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import { Link, useParams } from "react-router-dom";
import { dogGeneralDisplay, dogSexDisplay, dogMedicalDisplay, dogOwnerDisplay, dogAttendanceDisplay } from "./utils/cardData";

const Sidebar = ({ dogList, attendanceList, activeAttendance }) => {
  const { id } = useParams();
  const [dog, setDog] = useState();
  const [attendance, setAttendance] = useState();

  console.log("ATTLIST IN SIDEBAR", attendanceList);

  useEffect(() => {
    if (dogList) setDog(_.head(dogList.filter((d) => d._id.toString() === id)));
    if (attendanceList) setAttendance(attendanceList.filter((att) => att.dog._id.toString() === id));
  }, [dogList, attendanceList, id, activeAttendance]);

  if (dog && attendance) {
    console.log("SIDEBAR BEFORE RETURN", dog, attendance);
    return (
      <SidebarStyle>
        <Card display={dogGeneralDisplay(dog, "spanish")} />
        <Card display={dogSexDisplay(dog, "spanish")} />
        <Card display={dogMedicalDisplay(dog, "spanish")} />
        <Card display={dogOwnerDisplay(dog, "spanish")} />
        <Card display={dogAttendanceDisplay(attendance, "spanish")} />
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
  };
};

export default connect(mapStateToProps)(Sidebar);
