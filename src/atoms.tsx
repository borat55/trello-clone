import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {},
});

export const boardListArr = atom({
  key: "boardList",
  default: [] as string[],
});

export const mouseOver = atom({
  key: "mouseOver",
  default: false,
});

export const openModal = atom({
  key: "openModal",
  default: false,
});

export const boardTitle = atom({
  key: "boardTitle",
  default: "",
});
export const boardTitleModal = atom({
  key: "boardTitleModal",
  default: false,
});

export const toDoModal = atom({
  key: "toDoModal",
  default: false,
});

export const editToDoModal = atom({
  key: "editToDoModal",
  default: {},
});
