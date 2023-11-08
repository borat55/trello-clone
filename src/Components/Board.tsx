import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { allBoardsState, boardListArr } from "../atoms";
import { useCallback } from "react";
import DraggableBoards from "./DraggableBoards";
import Trashcan from "./TrashCan";

const Wrap = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const DropArea = styled.div``;

const Board = () => {
  const [AllBoards, setAllBoards] = useRecoilState(allBoardsState);
  const [boardList, setBoardList] = useRecoilState(boardListArr);

  const onDragEnd = useCallback(
    (info: DropResult) => {
      console.log("info", info);
      const { destination, source, type } = info;
      if (
        !destination ||
        (source.droppableId === destination.droppableId &&
          source.index === destination.index)
      )
        return;
      if (type === "card") {
        if (destination?.droppableId === source.droppableId) {
          setAllBoards((allBoards) => {
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
            setAllBoards((allBoards) => {
              const sourceBoard = [...allBoards[source.droppableId]];
              sourceBoard.splice(source.index, 1);
              return { ...allBoards, [source.droppableId]: sourceBoard };
            });
          } else {
            setAllBoards((allBoards) => {
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
        setBoardList((list) => {
          const listCopy = [...list];
          const targetBoard = listCopy.splice(source.index, 1)[0];
          listCopy.splice(destination.index, 0, targetBoard);
          return listCopy;
        });
      }
    },
    [setAllBoards]
  );

  return (
    <Wrap>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="boards" type="board">
          {(provided) => (
            <DropArea ref={provided.innerRef} {...provided.droppableProps}>
              {boardList.map((boardId, index) => (
                <DraggableBoards boardId={boardId} index={index} />
              ))}
              {provided.placeholder}
            </DropArea>
          )}
        </Droppable>
        <Trashcan />
      </DragDropContext>
    </Wrap>
  );
};

export default Board;
