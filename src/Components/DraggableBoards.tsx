import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  IBoardProps,
  ITodo,
  allBoardsState,
  boardTitleModal,
  boardTitle,
  changingTitle,
} from "../atoms";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import DraggableCard from "./DraggableCard";
import Deleteboard from "./Deleteboard";
import BoardTitleModal from "./BoardTitleModal";

interface IForm {
  toDo: string;
}

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

// interface IBoardProps {
//   toDos: ITodo[];
//   boardId: string;
//   index: number;
// }

const Container = styled.div`
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

const Body = styled.div``;

const DraggableBoards = ({ boardId, index }: IBoardProps) => {
  const [allBoards, setAllBoards] = useRecoilState(allBoardsState);
  const [boardtitleModal, setBoardTitleModal] = useRecoilState(boardTitleModal);
  const setBoardTitle = useSetRecoilState(boardTitle);
  const setChangingTItle = useSetRecoilState(changingTitle);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
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
  };

  const handleTitleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setChangingTItle(event.currentTarget.outerText);
    setBoardTitleModal(true);
    setBoardTitle(boardId);
  };

  return (
    <Draggable key={boardId} draggableId={boardId} index={index}>
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <header>
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
              <BoardTitleModal />
              <Deleteboard boardId={boardId} index={index} />
            </div>

            <Form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("toDo", { required: true })}
                type="text"
                placeholder={`Add task on ${boardId} board`}
                autoComplete="off"
              />
            </Form>
          </header>

          <Body>
            <Droppable droppableId={boardId} type="card">
              {(provided, snapshot) => (
                <Area
                  isDraggingOver={snapshot.isDraggingOver}
                  isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {allBoards[boardId].map((toDo, index) => (
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
          </Body>
        </Container>
      )}
    </Draggable>
  );
};

export default DraggableBoards;
