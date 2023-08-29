import { StyleBoardModal } from "./StyleBoardModal";
import { boardTitle, boardTitleModal, toDoState } from "../atoms";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { useCallback } from "react";

interface IBoardName {
  changeTitle: string;
}

const BoardTitle = () => {
  const [boardtitleModal, setBoardTitleModal] = useRecoilState(boardTitleModal);
  const [boardtitle, setboardTitle] = useRecoilState(boardTitle);
  const { register, handleSubmit, getValues, setValue } = useForm<IBoardName>();
  const [toDos, setToDos] = useRecoilState(toDoState);

  const handleCloseBoardTitleModal = useCallback(() => {
    setBoardTitleModal(false);
  }, [setBoardTitleModal]);

  const handleCloseBtn = useCallback(() => {
    setBoardTitleModal(false);
  }, [setBoardTitleModal]);

  const onSubmit = useCallback(() => {
    const title = getValues("changeTitle");
    setToDos((todos) => {
      const copiedBoard = { ...todos };
      const existToDos = copiedBoard[boardtitle];
      delete copiedBoard[boardtitle];
      const result = { ...copiedBoard, [title]: existToDos };
      return result;
    });
    setValue("changeTitle", "");
    handleCloseBoardTitleModal();
  }, [getValues, setToDos, setValue]);

  return (
    <StyleBoardModal
      isOpen={boardtitleModal}
      onRequestClose={handleCloseBoardTitleModal}
      ariaHideApp={false}
    >
      <button onClick={handleCloseBtn}>X</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Board Name to change</h3>
        <input
          type="text"
          {...register("changeTitle", { required: true, maxLength: 10 })}
        />
      </form>
    </StyleBoardModal>
  );
};

export default BoardTitle;
