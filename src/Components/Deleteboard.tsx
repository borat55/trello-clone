import styled from "styled-components";

const Remove = styled.button`
  border: 0;
  position: absolute;
  top: -4px;
  left: 180px;
  border: none;
  background-color: transparent;
  padding: 5px;
  cursor: pointer;
`;

const Removeboard = () => {
  return <Remove>❌</Remove>;
};

export default Removeboard;
