import React from "react";
import styled from "styled-components";

const Form = styled.form`
  input:invalid {
    content: "✖";
    padding-left: 5px;
    color: #8b0000;
  }

  input:valid {
    content: "✓";
    padding-left: 5px;
    color: #009000;
  }
`;

export const RegisterOwner = () => (
  <Form>
    <div class="form-group">
      <label for="ownerName">Nombre</label>
      <input type="text" class="form-control" id="ownerName" placeholder="Paquita" />
    </div>
    <div class="form-group">
      <label for="ownerLastName">Apellidos</label>
      <input type="text" class="form-control" id="ownerLastName" placeholder="Salas" />
    </div>
    <div class="form-group">
      <label for="username">Email</label>
      <input type="email" class="form-control" id="username" placeholder="paquita@salas.com" />
    </div>
    <div class="form-group">
      <label for="ownerPhone">Teléfono de contacto</label>
      <input type="tel" class="form-control" id="ownerPhone" required pattern="[0-9]{9}" placeholder="666777888" />
      <span></span>
    </div>
  </Form>
);
