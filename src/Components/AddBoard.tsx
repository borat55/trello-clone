import styled from "styled-components";
import Modal from "react-modal";
import { openModal, toDoState } from "../atoms";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";

const StyleBoardModal = styled(Modal)`
  height: 200px;
  width: 350px;
  background-color: #c5d7da;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  button {
    border: none;
    font-size: 20px;
    background-color: transparent;
    padding: 7px;
    position: absolute;
    right: 5px;
    cursor: pointer;
    color: #134549;
  }
  form {
    text-align: center;
  }
  h3 {
    margin-top: 40px;
    color: #134549;
    font-size: 40px;
  }
  input {
    margin-top: 30px;
    width: 90%;
    font-size: 25px;
    border: none;
    background-color: #eaf6f7;
    border-radius: 10px;
    padding: 7px;
    outline: none;
    color: #134549;
  }
`;

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
          {...register("boardName", { required: true, maxLength: 20 })}
        />
      </form>
    </StyleBoardModal>
  );
};

export default AddBoard;
