import React, { useContext } from "react";

const FormDisplayContext = React.createContext({ isOpen: false });

export const useFormDisplay = () => {
  const formDisplay = useContext(FormDisplayContext);
  return formDisplay.isOpen;
};

export const useFormDisplaySetter = () => {
  const formDisplay = useContext(FormDisplayContext);
  return formDisplay.setIsOpen;
};

export const useFormAnchor = () => {
  const formDisplay = useContext(FormDisplayContext);
  return formDisplay.anchor;
};

export const useFormAnchorSetter = () => {
  const formDisplay = useContext(FormDisplayContext);
  return formDisplay.setAnchor;
};

export default FormDisplayContext;
