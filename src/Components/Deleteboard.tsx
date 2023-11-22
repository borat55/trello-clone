import styled from "styled-components";
import { allBoardsState, boardListArr } from "../atoms";
import { useRecoilState } from "recoil";
import { ITodo, IBoardProps } from "../atoms";
import React from "react";

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
  const [boardList, setBoardList] = useRecoilState(boardListArr);

  const removeClick = () => {
    setBoardList((prev) => {
      const copiedTodos = [...prev];
      const removeItem = copiedTodos.indexOf(boardId + "");
      copiedTodos.splice(removeItem, 1);
      return copiedTodos;
    });
  };

  const resetClick = () => {
    setAllBoards((allBoards) => {
      const copied = { ...allBoards };
      const {
        [boardId]: [],
        ...rest
      } = copied;
      copied[boardId] = [];
      return copied;
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      <ResetBoard onClick={resetClick}>🔄</ResetBoard>

      <Remove onClick={removeClick}>❌</Remove>
    </div>
  );
};

export default React.memo(ResetnRemoveboard);
