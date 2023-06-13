import { StyleBoardModal } from "./StyleBoardModal";
import { toDoModal, editToDoModal, toDoState } from "../atoms";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";

const TodoModal = () => {
  const { register, handleSubmit, watch, getValues, setValue } = useForm();
  const [todoModal, setToDoModal] = useRecoilState(toDoModal);
  const [editTodoModal, setEditToDoModal] = useRecoilState(editToDoModal);
  const [toDos, setToDos] = useRecoilState(toDoState);
  console.log("editTodoModal outside", editTodoModal);
  const closeEditTodoModal = () => {
    setToDoModal(false);
  };

  const handleEditToDo = () => {
    const text = getValues("editToDo");
    setToDos((todos) => {
      const cardKey = Object.keys(editTodoModal)[0];
      const cardValue = Object.values(editTodoModal)[0];
      const { [cardKey]: todosToEdit, ...restToDos } = todos;
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
    <StyleBoardModal isOpen={todoModal} onRequestClose={closeEditTodoModal}>
      <button onClick={closeEditTodoModal}>X</button>
      <form onSubmit={handleSubmit(handleEditToDo)}>
        <h3>Edit To-Do</h3>
        <input type="text" {...register("editToDo", { required: true })} />
      </form>
    </StyleBoardModal>
  );
};

export default TodoModal;
