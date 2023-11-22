import { StyleBoardModal } from "../StyleBoardModal";
import { boardTitle, boardTitleModal, allBoardsState } from "../atoms";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { useCallback } from "react";

interface IBoardName {
  changeTitle: string;
}

const BoardTitleModal = () => {
  const [boardtitleModal, setBoardTitleModal] = useRecoilState(boardTitleModal);
  const [boardtitle, setboardTitle] = useRecoilState(boardTitle);
  const { register, handleSubmit, getValues, setValue } = useForm<IBoardName>();
  const [allBoards, setAllBoards] = useRecoilState(allBoardsState);

  const handleCloseBoardTitleModal = useCallback(() => {
    setBoardTitleModal(false);
  }, [setBoardTitleModal]);

  const handleCloseBtn = () => {
    setBoardTitleModal(false);
  };

  const onSubmit = useCallback(() => {
    const title = getValues("changeTitle");
    setAllBoards((allBoards) => {
      const copiedBoard = { ...allBoards };
      const existToDos = copiedBoard[boardtitle];
      delete copiedBoard[boardtitle];
      const result = { ...copiedBoard, [title]: existToDos };
      return result;
    });
    setValue("changeTitle", "");
    handleCloseBoardTitleModal();
  }, [getValues, setAllBoards, setValue]);

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

export default BoardTitleModal;
