import { StyleBoardModal } from "../StyleBoardModal";
import { toDoModal, editToDoModal, allBoardsState } from "../atoms";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import React from "react";

const TodoModal = () => {
  const { register, handleSubmit, watch, getValues, setValue } = useForm();
  const [todoModal, setToDoModal] = useRecoilState(toDoModal);
  const [editTodoModal, setEditToDoModal] = useRecoilState(editToDoModal);
  const [allBoards, setAllBoards] = useRecoilState(allBoardsState);

  const closeEditTodoModal = () => {
    setToDoModal(false);
  };

  const handleEditToDo = () => {
    const text = getValues("editToDo");
    setAllBoards((allBoards) => {
      const cardKey = Object.keys(editTodoModal)[0];
      const cardValue = Object.values(editTodoModal)[0];
      const { [cardKey]: todosToEdit, ...restToDos } = allBoards;
      const editedTodo = { id: Number(cardValue), text };
      const updatedTodos = [
        editedTodo,
        ...todosToEdit.filter((todo) => todo.id !== editedTodo.id),
      ];
      const result = { ...restToDos, [cardKey]: updatedTodos };
      return result;
    });
    setValue("editToDo", "");
    closeEditTodoModal();
  };
  return (
    <StyleBoardModal
      isOpen={todoModal}
      onRequestClose={closeEditTodoModal}
      ariaHideApp={false}
    >
      <button onClick={closeEditTodoModal}>X</button>
      <form onSubmit={handleSubmit(handleEditToDo)}>
        <h3>Edit To-Do</h3>
        <input type="text" {...register("editToDo", { required: true })} />
      </form>
    </StyleBoardModal>
  );
};

export default React.memo(TodoModal);
