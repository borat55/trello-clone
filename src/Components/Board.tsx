import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DragabbleCard";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import Removeboard from "./Deleteboard";

const Wrapper = styled.div`
  padding: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
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
  width: 100%;
  margin-top: 30px;
  input {
    width: 100%;
    padding: 0;
  }
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
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
  return (
    <Wrapper>
      <div
        style={{
          width: "13%",
          position: "absolute",
        }}
      >
        <Title>{boardId}</Title>
        <Removeboard />
      </div>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
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
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
