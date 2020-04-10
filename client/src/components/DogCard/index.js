import React, { useEffect } from "react";
import { connect } from "react-redux";
import TableLayout from "./style";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import { Link, useParams } from "react-router-dom";

const Table = ({ title, content }) => {
  if (typeof content === "boolean") content = `${content}`;
  return (
    <TableLayout>
      <div>{title}</div>
      <div>{content}</div>
    </TableLayout>
  );
};

const DogCard = ({ list }) => {
  const { id } = useParams();
  if (list) {
    const [dog] = list.filter((d) => d._id.toString() === id);
    const createCard = () => {
      const table = Object.keys(dog).map((key, i) => {
        console.log(key);
        if (typeof dog[key] === "object") {
          return (
            <Table
              key={i}
              title={key}
              content={Object.keys(dog[key]).map((subkey, i) => {
                return <Table key={i} title={subkey} content={dog[key][subkey]} />;
              })}
            />
          );
        }
        return <Table key={i} title={key} content={dog[key]} />;
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
          <Link to={`/dogs/edit/${dog._id}`}>Editar</Link>
        </Button>
      </div>
    );
  } else return <div>Loading...</div>;
};

const mapStateToProps = (state) => {
  return { list: state.dog.data };
};

export default connect(mapStateToProps)(DogCard);
