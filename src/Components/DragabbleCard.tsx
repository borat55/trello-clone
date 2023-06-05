import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";

const CardContainer = styled.div`
  height: 40px;
`;

const Card = styled.div<{ isDragging: boolean }>`
  /* position: absolute; */
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 7px 7px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : "none"};
`;
const EditToDoBtn = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 17px;
  position: relative;
  top: -35px;
  left: 128px;
  cursor: pointer;
`;
const DeleteToDoBtn = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 13px;
  position: relative;
  top: -36px;
  left: 120px;
  cursor: pointer;
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DraggableCard({
  toDoId,
  toDoText,
  index,
  boardId,
}: IDragabbleCardProps) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const editToDoBtn = () => {};

  const deleteToDoBtn = () => {
    setToDos((prev) => {
      const findBoard = prev[boardId];
      const deleteTodo = findBoard.filter((todo) => todo.id !== toDoId);
      const result = { ...prev, [boardId]: deleteTodo };
      return result;
    });
  };

  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card isDragging={snapshot.isDragging}>{toDoText}</Card>
          <EditToDoBtn onClick={editToDoBtn}>✂</EditToDoBtn>
          <DeleteToDoBtn onClick={deleteToDoBtn}>❌</DeleteToDoBtn>
        </CardContainer>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
