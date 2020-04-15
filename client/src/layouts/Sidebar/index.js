import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SidebarStyle } from "./style";
import { Card } from "../../components/Card";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import { Link, useParams } from "react-router-dom";
import { dogGeneralDisplay, dogSexDisplay, dogMedicalDisplay, dogOwnerDisplay } from "./utils/cardData";

const Sidebar = ({ list }) => {
  const { id } = useParams();
  if (list) {
    const [dog] = list.filter((d) => d._id.toString() === id);
    return (
      <SidebarStyle>
        <Card title="General" content={dogGeneralDisplay(dog, "spanish")} />
        <Card title="Sexo" content={dogSexDisplay(dog, "spanish")} />
        <Card title="Veterinaria" content={dogMedicalDisplay(dog, "spanish")} />
        <Card title="Dueño" content={dogOwnerDisplay(dog, "spanish")} />
        <Button variant="contained">
          <Link to={`/dogs/edit/${dog._id}`}>Editar</Link>
        </Button>
      </SidebarStyle>
    );
  } else return <div>Loading...</div>;
};

const mapStateToProps = (state) => {
  return { list: state.dog.list };
};

export default connect(mapStateToProps)(Sidebar);
