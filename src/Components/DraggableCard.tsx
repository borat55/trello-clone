import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React, { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { allBoardsState, toDoModal, editToDoModal } from "../atoms";

const CardContainer = styled.div<{ isDragging: boolean }>`
  height: auto;
  width: 180px;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 7px 7px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : "none"};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Card = styled.div`
  padding-right: 4px;
  line-height: 19px;
`;
const EditToDoBtn = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 17px;
  padding: 1px 2px 1px 1px;
  cursor: pointer;
`;
const DeleteToDoBtn = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 13px;
  padding: 1px 1px 1px 2px;
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
  const [allBoards, setAllBoards] = useRecoilState(allBoardsState);
  const setToDoModal = useSetRecoilState(toDoModal);
  const [editTodoModal, setEditToDoModal] = useRecoilState(editToDoModal);

  const editToDoBtn = useCallback(() => {
    setEditToDoModal({ [boardId]: toDoId });
    setToDoModal(true);
  }, [setEditToDoModal, setToDoModal]);

  const deleteToDoBtn = useCallback(() => {
    setAllBoards((prev) => {
      const findBoard = prev[boardId];
      const deleteTodo = findBoard.filter((todo) => todo.id !== toDoId);
      const result = { ...prev, [boardId]: deleteTodo };
      return result;
    });
  }, [setAllBoards, boardId]);

  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <CardContainer
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>{toDoText}</Card>
          <div style={{ display: "flex" }}>
            <EditToDoBtn onClick={editToDoBtn}>✂</EditToDoBtn>
            <DeleteToDoBtn onClick={deleteToDoBtn}>❌</DeleteToDoBtn>
          </div>
        </CardContainer>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
