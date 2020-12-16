import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: inherit; 
  text-decoration:none; 
  cursor:pointer;  
}
`;

export default GlobalStyle;
