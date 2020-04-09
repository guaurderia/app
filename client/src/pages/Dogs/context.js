import React, { useContext, useState } from "react";

export const DogContext = React.createContext();

export const useDog = (action, state) => {
  const dogState = useContext(DogContext);
  switch (action) {
    case "set":
      return dogState.setSelected(state);
    case "get":
      return dogState.selected;
  }
};
