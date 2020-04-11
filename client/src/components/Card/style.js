import styled from "styled-components";

export const TableLayout = styled.div`
  display: flex;
  > div {
    width: 100px;
    margin-right: 5px;
    &:nth-child(1) {
      font-weight: bold;
    }
  }
`;

export const Sidebar = styled.div`
  background: #f7f7f7;
  padding: 20px;
  overflow: hidden;
`;
