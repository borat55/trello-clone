import styled from "styled-components";
import { allBoardsState } from "../atoms";
import { useRecoilState } from "recoil";
import { ITodo, IBoardProps } from "../atoms";
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

const ResetnRemoveboard = ({ boardId }: IBoardProps) => {
  const [allBoards, setAllBoards] = useRecoilState(allBoardsState);

  const removeClick = useCallback(() => {
    setAllBoards((prev) => {
      const copiedTodos = { ...prev };
      delete copiedTodos[boardId];
      return copiedTodos;
    });
  }, [setAllBoards]);

  const resetClick = useCallback(() => {
    setAllBoards((allBoards) => {
      const copied = { ...allBoards };
      const {
        [boardId]: [],
        ...rest
      } = copied;
      copied[boardId] = [];
      return copied;
    });
  }, [setAllBoards, boardId]);

  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      <ResetBoard onClick={resetClick}>🔄</ResetBoard>
      <Remove onClick={removeClick}>❌</Remove>
    </div>
  );
};

export default React.memo(ResetnRemoveboard);
