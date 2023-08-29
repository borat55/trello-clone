import DraggableCard from "./DraggableCard";
import { ITodo } from "../atoms";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
  index: number;
}

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

const DroppableBoard = ({ boardId, toDos, index }: IBoardProps) => {
  return (
    <Droppable droppableId={boardId} type="card">
      {(provided, snapshot) => (
        <Area
          isDraggingOver={snapshot.isDraggingOver}
          isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
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
  );
};

export default React.memo(DroppableBoard);
