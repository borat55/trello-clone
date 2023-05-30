import styled from "styled-components";
import { toDoState } from "../atoms";
import { useRecoilState } from "recoil";

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

interface IBoardProps {
  boardId: string;
}

const Removeboard = ({ boardId }: IBoardProps) => {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onClick = () => {
    setToDos((prev) => {
      const copiedBoard = { ...prev };
      delete copiedBoard[boardId];
      return copiedBoard;
    });
  };

  return <Remove onClick={onClick}>❌</Remove>;
};

export default Removeboard;
