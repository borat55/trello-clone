import { StyleBoardModal } from "../StyleBoardModal";
import {
  boardTitle,
  boardTitleModal,
  allBoardsState,
  boardListArr,
  changingTitle,
} from "../atoms";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";

interface IBoardName {
  changeTitle: string;
}

const BoardTitleModal = () => {
  const [boardtitleModal, setBoardTitleModal] = useRecoilState(boardTitleModal);
  const [boardtitle, setboardTitle] = useRecoilState(boardTitle);
  const { register, handleSubmit, getValues, setValue } = useForm<IBoardName>();
  const [allBoards, setAllBoards] = useRecoilState(allBoardsState);
  const [boardList, setBoardList] = useRecoilState(boardListArr);
  const [changeTitle, setChangingTItle] = useRecoilState(changingTitle);

  const handleCloseBoardTitleModal = () => {
    setBoardTitleModal(false);
  };

  const handleCloseBtn = () => {
    setBoardTitleModal(false);
  };

  const onSubmit = () => {
    const title = getValues("changeTitle");
    setAllBoards((allBoards) => {
      const copiedBoard = { ...allBoards };
      const existToDos = copiedBoard[boardtitle];
      delete copiedBoard[boardtitle];
      const result = { ...copiedBoard, [title]: existToDos };
      return result;
    });

    setBoardList((oldList) => {
      if (oldList.includes(title)) {
        alert("This board name already exists.");
        return oldList;
      } else {
        const copyOldList = [...oldList];
        const deleteItem = copyOldList.indexOf(changeTitle);
        copyOldList.splice(deleteItem, 1, title);
        return copyOldList;
      }
    });
    setValue("changeTitle", "");
    handleCloseBoardTitleModal();
  };

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
