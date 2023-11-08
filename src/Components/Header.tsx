import { useRecoilState } from "recoil";
import { allBoardsState, mouseOver, openModal, IToDoState } from "../atoms";
import styled from "styled-components";
import React, { useCallback } from "react";

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

const Header = () => {
  const [allBoards, setAllBoards] = useRecoilState(allBoardsState);
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

  return (
    <AddBtnBox openBoardModal={openBoardModal} todos={allBoards}>
      <AddBoardBtn
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={addBoardClick}
      >
        +
      </AddBoardBtn>
      <Msg
        mouseover={mouseover}
        todos={allBoards}
        openBoardModal={openBoardModal}
      >
        Click the button to add a new board.
      </Msg>
    </AddBtnBox>
  );
};

export default Header;
