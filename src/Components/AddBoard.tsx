import { boardListArr, boardTitle, openModal, allBoardsState } from "../atoms";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { StyleBoardModal } from "../StyleBoardModal";
import React, { useCallback } from "react";

interface IBoardName {
  boardName: string;
}

const AddBoard = () => {
  const [openBoardModal, setOpenBoardModal] =
    useRecoilState<boolean>(openModal);
  const [allBoards, setAllBoards] = useRecoilState(allBoardsState);
  const [boardList, setBoardList] = useRecoilState(boardListArr);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<IBoardName>();

  const handleCloseBoardModal = useCallback(() => {
    setOpenBoardModal(false);
  }, [setOpenBoardModal]);

  const handleCloseBtn = useCallback(() => {
    setOpenBoardModal(false);
  }, [setOpenBoardModal]);

  const onSubmit = useCallback(() => {
    const title = getValues("boardName");

    setAllBoards((prev) => {
      const copyPrev = { ...prev };
      copyPrev[title] = [];
      return copyPrev;
    });

    setBoardList((oldList) => {
      if (oldList.includes(title)) {
        alert("This board name already exists.");
        return oldList;
      } else {
        const copyOldList = [...oldList];
        copyOldList.push(title);
        return copyOldList;
      }
    });

    setValue("boardName", "");
    handleCloseBoardModal();
  }, [setAllBoards, setBoardList, getValues, setValue]);

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

export default React.memo(AddBoard);
