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

export const mouseOver = atom({
  key: "mouseOver",
  default: false,
});

export const openModal = atom({
  key: "openModal",
  default: false,
});
