import styled from "styled-components";

const Table = styled.div`
  display: flex;
  > div {
    width: 100px;
    margin-right: 5px;
    &:nth-child(1) {
      font-weight: bold;
    }
  }
`;

export default Table;
