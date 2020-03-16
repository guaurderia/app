import React, { useState } from "react";

const NewOwnerForm = () => {
  return (
    <form>
      <label htmlFor="firstName">Nombre</label>
      <input type="text" />
      <input type="submit" value="+ Dueño" />
    </form>
  );
};

export default NewOwnerForm;
