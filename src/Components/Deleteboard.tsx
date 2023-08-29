import styled from "styled-components";
import { toDoState } from "../atoms";
import { useRecoilState } from "recoil";
import { ITodo } from "../atoms";
import React, { useCallback } from "react";

const Remove = styled.button`
  border: 0;
  /* position: absolute;
  top: -4px;
  left: 180px; */
  border: none;
  background-color: transparent;
  padding: 2px;

  cursor: pointer;
`;

const ResetBoard = styled.button`
  font-size: 16px;
  border: none;
  /* position: absolute;
  top: -7px;
  left: 157px; */
  border: none;
  background-color: transparent;
  padding: 2px;
  cursor: pointer;
`;

export interface IBoardProps {
  boardId: string;
}

const ResetnRemoveboard = ({ boardId }: IBoardProps) => {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const removeClick = useCallback(() => {
    setToDos((prev) => {
      const copiedTodos = { ...prev };
      delete copiedTodos[boardId];
      return copiedTodos;
    });
  }, [setToDos]);

  const resetClick = useCallback(() => {
    setToDos((todos) => {
      const copied = { ...todos };
      const {
        [boardId]: [],
        ...rest
      } = copied;
      copied[boardId] = [];
      return copied;
    });
  }, [setToDos, boardId]);

  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      <ResetBoard onClick={resetClick}>🔄</ResetBoard>
      <Remove onClick={removeClick}>❌</Remove>
    </div>
  );
};

export default React.memo(ResetnRemoveboard);
