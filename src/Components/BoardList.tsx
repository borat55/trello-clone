import { useForm } from "react-hook-form";
import { Droppable, Draggable } from "react-beautiful-dnd";

import styled from "styled-components";
import {
  ITodo,
  allBoardsState,
  boardTitleModal,
  boardTitle,
  boardListArr,
} from "../atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ResetnRemoveboard from "./Deleteboard";
import React, { useCallback, memo } from "react";

const DropArea = styled.div``;

const Wrapper = styled.div`
  padding: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  width: 210px;
`;

const Title = styled.div`
  text-align: center;
  font-weight: 600;

  font-size: 18px;
`;

const Form = styled.form`
  width: 95%;
  margin-top: 10px;
  input {
    width: 100%;
    padding: 2px;
    outline: none;
  }
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
  index: number;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId, index }: IBoardProps) {
  const [allBoards, setAllBoards] = useRecoilState(allBoardsState);
  const [boardtitleModal, setBoardTitleModal] = useRecoilState(boardTitleModal);
  const setBoardTitle = useSetRecoilState(boardTitle);
  const [boardListarr, setBoardListArr] = useRecoilState(boardListArr);

  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = useCallback(
    ({ toDo }: IForm) => {
      const newToDo = {
        id: Date.now(),
        text: toDo,
      };
      setAllBoards((allBoards) => {
        return {
          ...allBoards,
          [boardId]: [newToDo, ...allBoards[boardId]],
        };
      });
      setValue("toDo", "");
    },
    [setAllBoards, setValue]
  );

  const handleTitleClick = useCallback(() => {
    setBoardTitleModal(true);
    setBoardTitle(boardId);
  }, [setBoardTitleModal, setBoardTitle]);

  return (
    <Droppable droppableId="boards" type="board">
      {(provided) => (
        <DropArea ref={provided.innerRef} {...provided.droppableProps}>
          {Object.keys(allBoards).map((boardId, index) => (
            <Draggable key={boardId} draggableId={boardId} index={index}>
              {(provided) => (
                <Wrapper ref={provided.innerRef} {...provided.draggableProps}>
                  <div
                    {...provided.dragHandleProps}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "40px", height: "14px" }}></div>
                    <Title onClick={handleTitleClick}>{boardId}</Title>
                  </div>
                  <Form onSubmit={handleSubmit(onValid)}>
                    <input
                      {...register("toDo", { required: true })}
                      type="text"
                      placeholder={`Add task on ${boardId} board`}
                    />
                  </Form>
                </Wrapper>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </DropArea>
      )}
    </Droppable>
  );
}

export default React.memo(Board);
