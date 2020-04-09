import React from "react";
import TableLayout from "./style";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import { Link } from "react-router-dom";

const Table = ({ title, content }) => {
  if (typeof content === "boolean") content = `${content}`;
  return (
    <TableLayout>
      <div>{title}</div>
      <div>{content}</div>
    </TableLayout>
  );
};

const DogCard = ({ selected }) => {
  const createCard = () => {
    const table = Object.keys(selected).map((key, i) => {
      if (key === "vaccines" || key === "heat") {
        return (
          <Table
            key={i}
            title={key}
            content={Object.keys(selected[key]).map((subkey, i) => {
              return <Table key={i} title={subkey} content={selected[key][subkey]} />;
            })}
          />
        );
      }
      return <Table key={i} title={key} content={selected[key]} />;
    });
    return table;
  };

  return (
    <div>
      <Button variant="contained">
        <Link to={`/dogs/create`}>Nuevo</Link>
      </Button>
      {createCard()}
      <Button variant="contained">
        <Link to={`/dogs/edit/${selected._id}`}>Editar</Link>
      </Button>
    </div>
  );
};

export default DogCard;
