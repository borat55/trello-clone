import styled from "styled-components";
import { toDoState } from "../atoms";
import { useRecoilState } from "recoil";
import { ITodo } from "../atoms";

const Remove = styled.button`
  border: 0;
  position: absolute;
  top: -4px;
  left: 180px;
  border: none;
  background-color: transparent;
  padding: 5px;
  cursor: pointer;
`;

const ResetBoard = styled.button`
  font-size: 16px;
  border: none;
  position: absolute;
  top: -7px;
  left: 157px;
  border: none;
  background-color: transparent;
  padding: 5px;
  cursor: pointer;
`;

export interface IBoardProps {
  boardId: string;
}

const Removeboard = ({ boardId }: IBoardProps) => {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const remoceClick = () => {
    setToDos((prev) => {
      const copiedTodos = { ...prev };
      delete copiedTodos[boardId];
      return copiedTodos;
    });
  };

  const resetClick = () => {
    console.log(toDos["오늘"]);
    setToDos((todos) => {
      const copied = { ...todos };
      const {
        [boardId]: [],
        ...rest
      } = copied;
      copied[boardId] = [];
      return copied;
    });
  };

  return (
    <div>
      <ResetBoard onClick={resetClick}>🔄</ResetBoard>
      <Remove onClick={remoceClick}>❌</Remove>
    </div>
  );
};

export default Removeboard;
