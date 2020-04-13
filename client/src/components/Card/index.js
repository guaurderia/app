import React, { useState } from "react";
import { CardTitle, TableLayout } from "./style";

const Table = ({ item, content }) => {
  if (typeof content === "boolean") content = `${content}`;
  return (
    <TableLayout>
      <div>{item}</div>
      <div>{content}</div>
    </TableLayout>
  );
};

export const Card = ({ title, content }) => {
  const [show, setShow] = useState(false);
  const contentList = content.map((data, i) => {
    return <Table key={i} item={data.label} content={data.value} />;
  });
  return (
    <>
      <CardTitle onClick={(e) => setShow(!show)} {...{ show }}>
        {title}
      </CardTitle>
      {show && contentList}
    </>
  );
};
