import React from "react";
import styled from "styled-components";
import Header from "./Components/Header";
import AddBoard from "./Components/AddBoard";
import Board from "./Components/Board";
import Trashcan from "./Components/TrashCan";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 680px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  min-height: 100vh;
`;

function App() {
  return (
    <Container>
      <Header />
      <AddBoard />
      <Board />
    </Container>
  );
}

export default React.memo(App);
