import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState, mouseOver, openModal, IToDoState } from "./atoms";
import Board from "./Components/Board";
import AddBoard from "./Components/AddBoard";
import BoardTitle from "./Components/BoardTitle";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AddBtnBox = styled.div`
  position: absolute;
`;

const AddBoardBtn = styled.button<{
  todos: IToDoState;
  openBoardModal: boolean;
}>`
  position: relative;
  top: ${(props) =>
    Object.keys(props.todos).length === 0 && props.openBoardModal === false
      ? "0px"
      : "-380px"};
  left: ${(props) =>
    Object.keys(props.todos).length === 0 && props.openBoardModal === false
      ? "10px"
      : "1020px"};
  border: none;
  outline: none;
  background-color: navy;
  padding: 5px 17px;
  border-radius: 50%;
  color: white;
  font-size: 40px;
  cursor: pointer;
`;

const Msg = styled.h3<{
  mouseover: boolean;
  todos: IToDoState;
  openBoardModal: boolean;
}>`
  visibility: hidden;
  visibility: ${(props) => (props.mouseover ? "hidden" : "visible")};
  position: relative;
  text-align: center;
  top: ${(props) =>
    Object.keys(props.todos).length === 0 && props.openBoardModal === false
      ? "15px"
      : "-365px"};
  left: ${(props) =>
    Object.keys(props.todos).length === 0 && props.openBoardModal === false
      ? "-95px"
      : "990px"};
  color: skyblue;
  width: ${(props) =>
    Object.keys(props.todos).length === 0 && props.openBoardModal === false
      ? "280px"
      : "120px"};
  font-size: ${(props) =>
    Object.keys(props.todos).length === 0 && props.openBoardModal === false
      ? "30px"
      : "20px"};
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [mouseover, setMouseover] = useRecoilState(mouseOver);
  const [openBoardModal, setOpenBoardModal] = useRecoilState(openModal);

  const onMouseEnter = () => {
    setMouseover(false);
  };

  const onMouseLeave = () => {
    setMouseover(true);
  };

  const addBoardClick = () => {
    setOpenBoardModal(true);
  };
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    console.log(info);

    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskOjg = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskOjg);

        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskOjg = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskOjg);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <AddBtnBox>
          <AddBoardBtn
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={addBoardClick}
            todos={toDos}
            openBoardModal={openBoardModal}
          >
            +
          </AddBoardBtn>
          <Msg
            mouseover={mouseover}
            todos={toDos}
            openBoardModal={openBoardModal}
          >
            Click the button to add a new board.
          </Msg>
        </AddBtnBox>
        <AddBoard />
        <BoardTitle />
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
