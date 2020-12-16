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

export const CardTitle = styled.div`
  color: #6d6d6d;
  text-transform: uppercase;
  font-weight: 500;
  ::after {
    border: solid #6d6d6d;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    margin: 0 10px ${(props) => (props.show ? "1px" : "3px")};
    transform: ${(props) => (props.show ? "rotate(-135deg)" : "rotate(45deg)")};
    content: "";
  }
`;
