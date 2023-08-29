import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState, mouseOver, openModal, IToDoState } from "./atoms";
import Board from "./Components/BoardList";
import AddBoard from "./Components/AddBoard";
import BoardTitle from "./Components/BoardTitle";
import TodoModal from "./Components/ToDoModal";
import Trashcan from "./Components/TrashCan";
import React, { useCallback } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 680px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  min-height: 100vh;
`;

const AddBtnBox = styled.div<{ openBoardModal: boolean; todos: IToDoState }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: ${(props) =>
    Object.keys(props.todos).length === 0 && props.openBoardModal === false
      ? "45%"
      : "50px"};
  right: ${(props) =>
    Object.keys(props.todos).length === 0 && props.openBoardModal === false
      ? "43%"
      : "100px"};
`;

const AddBoardBtn = styled.button`
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
  text-align: center;
  margin-top: 10px;
  visibility: hidden;
  visibility: ${(props) => (props.mouseover ? "hidden" : "visible")};
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
  const onMouseEnter = useCallback(() => {
    setMouseover(false);
  }, [setMouseover]);

  const onMouseLeave = useCallback(() => {
    setMouseover(true);
  }, [setMouseover]);

  const addBoardClick = useCallback(() => {
    setOpenBoardModal(true);
  }, [setOpenBoardModal]);

  const onDragEnd = useCallback(
    (info: DropResult) => {
      console.log(info);
      const { destination, source, type } = info;
      if (!destination) return;
      if (type === "card") {
        if (destination?.droppableId === source.droppableId) {
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
          if (destination.droppableId === "trashcan") {
            setToDos((allBoards) => {
              const sourceBoard = [...allBoards[source.droppableId]];
              sourceBoard.splice(source.index, 1);
              return { ...allBoards, [source.droppableId]: sourceBoard };
            });
          } else {
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
        }
      }

      if (type === "board") {
        console.log("working");
      }
    },
    [setToDos, setOpenBoardModal, setMouseover]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <AddBtnBox openBoardModal={openBoardModal} todos={toDos}>
          <AddBoardBtn
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={addBoardClick}
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
        <TodoModal />
        <Boards>
          {Object.keys(toDos).map((boardId, index) => (
            <Board
              boardId={boardId}
              key={boardId}
              toDos={toDos[boardId]}
              index={index}
            />
          ))}
        </Boards>
        <Trashcan />
      </Wrapper>
    </DragDropContext>
  );
}

export default React.memo(App);
