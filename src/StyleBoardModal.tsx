import styled from "styled-components";
import Modal from "react-modal";

export const StyleBoardModal = styled(Modal)`
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
