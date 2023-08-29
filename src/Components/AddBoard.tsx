import { boardListArr, boardTitle, openModal, toDoState } from "../atoms";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { StyleBoardModal } from "./StyleBoardModal";
import React, { useCallback } from "react";

interface IBoardName {
  boardName: string;
}

const AddBoard = () => {
  const [openBoardModal, setOpenBoardModal] =
    useRecoilState<boolean>(openModal);
  const [toDos, setTodos] = useRecoilState(toDoState);
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
    setTodos((prev) => {
      const result = { [title]: [], ...prev };
      return result;
    });
    setBoardList((oldList) => {
      const copyOldList = [...oldList];
      copyOldList.push(title);
      return copyOldList;
    });

    setValue("boardName", "");
    handleCloseBoardModal();
  }, [setTodos, setBoardList, getValues, setValue]);

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
