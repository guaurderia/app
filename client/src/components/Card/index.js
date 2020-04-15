import React, { useState } from "react";
import { CardTitle, TableLayout } from "./style";
import _ from "lodash";

const Table = ({ label, value }) => {
  if (typeof value === "boolean") value = `${value}`;
  return (
    <TableLayout>
      <div>{label}</div>
      <div>{value}</div>
    </TableLayout>
  );
};

export const Card = ({ display }) => {
  const [show, setShow] = useState(false);
  const contentTable = display.content.map((label, i) => {
    if (_.has(label, "title")) {
      const subtitle = label.title;
      return (
        <div key={i}>
          <div>{subtitle}</div>
          {label.content.map((sublabel, j) => (
            <Table key={j} label={sublabel.label} value={sublabel.value} />
          ))}
        </div>
      );
    } else return <Table key={i} label={label.label} value={label.value} />;
  });
  return (
    <>
      <CardTitle onClick={(e) => setShow(!show)} {...{ show }}>
        {display.title}
      </CardTitle>
      {show && contentTable}
    </>
  );
};
