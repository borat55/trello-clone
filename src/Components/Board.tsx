import { useForm } from "react-hook-form";
import { Droppable, Draggable } from "react-beautiful-dnd";
import DraggableCard from "./DragabbleCard";
import styled from "styled-components";
import {
  ITodo,
  toDoState,
  boardTitleModal,
  boardTitle,
  boardListArr,
} from "../atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ResetnRemoveboard from "./Deleteboard";
import BoardTitle from "./BoardTitle";
import React from "react";
import { memo } from "react";

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

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparant"};
  flex-grow: 1;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;
  padding: 10px;
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
  const setToDos = useSetRecoilState(toDoState);
  const [boardtitleModal, setBoardTitleModal] = useRecoilState(boardTitleModal);
  const setBoardTitle = useSetRecoilState(boardTitle);
  const [boardListarr, setBoardListArr] = useRecoilState(boardListArr);

  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };

  const handleTitleClick = () => {
    setBoardTitleModal(true);
    setBoardTitle(boardId);
  };

  return (
    <Droppable droppableId="boards" type="board">
      {(provided) => (
        <DropArea ref={provided.innerRef} {...provided.droppableProps}>
          {boardListarr.map((boardId, index) => (
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
                    <ResetnRemoveboard boardId={boardId} />
                  </div>
                  <Form onSubmit={handleSubmit(onValid)}>
                    <input
                      {...register("toDo", { required: true })}
                      type="text"
                      placeholder={`Add task on ${boardId} board`}
                    />
                  </Form>
                  <Droppable droppableId={boardId} type="card">
                    {(provided, snapshot) => (
                      <Area
                        isDraggingOver={snapshot.isDraggingOver}
                        isDraggingFromThis={Boolean(
                          snapshot.draggingFromThisWith
                        )}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {toDos.map((toDo, index) => (
                          <DraggableCard
                            toDoId={toDo.id}
                            toDoText={toDo.text}
                            key={toDo.id}
                            index={index}
                            boardId={boardId}
                          />
                        ))}
                        {provided.placeholder}
                      </Area>
                    )}
                  </Droppable>
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

export default Board;
