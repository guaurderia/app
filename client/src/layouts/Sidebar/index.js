import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SidebarStyle } from "./style";
import { Card } from "../../components/Card";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import { Link, useParams } from "react-router-dom";
import { dogGeneralDisplay, dogSexDisplay, dogMedicalDisplay, dogOwnerDisplay, dogAttendanceDisplay } from "./utils/cardData";

const Sidebar = ({ dogList, attendanceList }) => {
  const { id } = useParams();
  const attendanceSubtitle = (attendance) => new Date(attendance.startTime);
  if (dogList && attendanceList) {
    const [dog] = dogList.filter((d) => d._id.toString() === id);
    const attendance = attendanceList.filter((att) => att.dog._id.toString() === id);
    console.log("ATT SIDEBAR", attendance, attendanceList);
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
  };
};

export default connect(mapStateToProps)(Sidebar);
