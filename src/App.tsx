import React from "react";
import styled from "styled-components";
import Header from "./Components/Header";
import AddBoard from "./Components/AddBoard";
import Board from "./Components/Board";

const Container = styled.div`
  overflow-x: auto;
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
