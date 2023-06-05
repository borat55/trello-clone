import { boardTitle, openModal, toDoState } from "../atoms";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { StyleBoardModal } from "./StyleBoardModal";

interface IBoardName {
  boardName: string;
}

const AddBoard = () => {
  const [openBoardModal, setOpenBoardModal] =
    useRecoilState<boolean>(openModal);
  const [toDos, setTodos] = useRecoilState(toDoState);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<IBoardName>();

  const handleCloseBoardModal = () => {
    setOpenBoardModal(false);
  };

  const handleCloseBtn = () => {
    setOpenBoardModal(false);
  };

  const onSubmit = () => {
    const title = getValues("boardName");
    setTodos((prev) => {
      const result = { [title]: [], ...prev };
      return result;
    });
    setValue("boardName", "");
    handleCloseBoardModal();
  };

  return (
    <StyleBoardModal
      isOpen={openBoardModal}
      onRequestClose={handleCloseBoardModal}
      ariaHideApp={false}
    >
      <button onClick={handleCloseBtn}>X</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Board Name</h3>
        <input
          type="text"
          {...register("boardName", { required: true, maxLength: 10 })}
        />
      </form>
    </StyleBoardModal>
  );
};

export default AddBoard;
